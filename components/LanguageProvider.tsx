"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DICT, type Lang, type Dict } from "@/lib/i18n";

const Ctx = createContext<{ lang: Lang; dir: "ltr" | "rtl"; t: Dict; setLang: (l: Lang) => void }>({
  lang: "en",
  dir: "ltr",
  t: DICT.en,
  setLang: () => {},
});

export const useLang = () => useContext(Ctx);

export function LanguageProvider({ children, initial = "en" }: { children: React.ReactNode; initial?: Lang }) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initial);

  const apply = (l: Lang) => {
    const r = document.documentElement;
    r.lang = l;
    r.dir = l === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    apply(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = (l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem("lang", l);
    } catch {}
    apply(l);
    setLangState(l);
    router.refresh(); // re-render server components in the new language
  };

  const dir = lang === "ar" ? "rtl" : "ltr";
  return <Ctx.Provider value={{ lang, dir, t: DICT[lang] as Dict, setLang }}>{children}</Ctx.Provider>;
}
