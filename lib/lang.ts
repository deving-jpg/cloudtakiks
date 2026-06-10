import { cookies } from "next/headers";
import { DICT, type Lang, type Dict } from "./i18n";

export function getLang(): Lang {
  const v = cookies().get("lang")?.value;
  return v === "ar" ? "ar" : v === "es" ? "es" : v === "fr" ? "fr" : "en";
}

export function getDict(): Dict {
  return DICT[getLang()] as Dict;
}
