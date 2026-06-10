import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getBlogs, addBlog, slugify, type BlogPost } from "@/lib/blogs";
import { isAuthed } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getBlogs());
}

export async function POST(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const title = String(form.get("title") ?? "").trim();
    const category = String(form.get("category") ?? "Technology").trim() || "Technology";
    const excerpt = String(form.get("excerpt") ?? "").trim();
    const date = String(form.get("date") ?? "").trim();
    const bodyText = String(form.get("body") ?? "").trim();

    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const slug = slugify(title);

    // optional image upload
    let image: string | undefined;
    const file = form.get("image");
    if (file && file instanceof File && file.size > 0) {
      const ext = (file.name.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
      const buf = Buffer.from(await file.arrayBuffer());
      const dir = path.join(process.cwd(), "public", "img", "blogs");
      await fs.mkdir(dir, { recursive: true });
      const fname = `${slug}-${Date.now()}.${ext || "png"}`;
      await fs.writeFile(path.join(dir, fname), buf);
      image = `/img/blogs/${fname}`;
    } else {
      const imageUrl = String(form.get("imageUrl") ?? "").trim();
      if (imageUrl) image = imageUrl;
    }

    const body = bodyText
      ? bodyText.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
      : [];

    const post: BlogPost = {
      slug,
      title,
      excerpt: excerpt || (body[0] ?? ""),
      date: date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      views: 0,
      category,
      image,
      body,
    };

    await addBlog(post);
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || "Failed to add blog." }, { status: 500 });
  }
}
