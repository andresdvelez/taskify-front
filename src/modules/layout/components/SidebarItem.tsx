import { cn } from "@nextui-org/react";
import { SidebarItemType } from "../hooks/useSidebar";
import { Link } from "@/modules/translations/i18n/routing";
import { useTranslations } from "next-intl";

interface SidebarItemProps {
  item: SidebarItemType;
  isSelected: boolean;
}

export function SidebarItem({ item, isSelected }: SidebarItemProps) {
  const { label, icon, href } = item;

  const t = useTranslations("sidebar");

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        "hover:bg-gray-100 hover:text-gray-900",
        isSelected && "bg-black text-white hover:bg-black/90 hover:text-white"
      )}
    >
      <span className="text-lg">{icon}</span>
      {t(label)}
    </Link>
  );
}
