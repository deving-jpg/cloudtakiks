import fs from "fs/promises";
import path from "path";
import { BLOG } from "./data";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  views: number;
  category: string;
  image?: string;
  body?: string[];
};

const FILE = path.join(process.cwd(), "data", "blogs.json");

// On first run, seed the JSON store from the built-in BLOG list.
async function ensureFile() {
  try {
    await fs.access(FILE);
  } catch {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(BLOG, null, 2), "utf-8");
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : BLOG;
  } catch {
    return BLOG;
  }
}

export async function addBlog(post: BlogPost): Promise<void> {
  const all = await getBlogs();
  // newest first; replace if the slug already exists
  const filtered = all.filter((b) => b.slug !== post.slug);
  await fs.writeFile(FILE, JSON.stringify([post, ...filtered], null, 2), "utf-8");
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
