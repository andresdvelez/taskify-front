import { Link } from "@/modules/translations/i18n/routing";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="h-6 w-6 bg-blue-200 rounded-full" />
      <span className="font-semibold">Taskify</span>
    </Link>
  );
};
