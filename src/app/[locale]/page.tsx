import { redirect } from "@/modules/translations/i18n/routing";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();

  return redirect({ href: "/dashboard", locale: locale });
}
