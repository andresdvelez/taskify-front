import { usePathname } from "@/modules/translations/i18n/routing";
import { ReactNode } from "react";

export type SidebarItemType = {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
};

export const navigationItems: SidebarItemType[] = [
  {
    id: "dashboard",
    label: "dashboard",
    icon: <i className="icon-[mynaui--home]" role="img" aria-hidden="true"></i>,
    href: "/dashboard",
  },
  {
    id: "projects",
    label: "projects",
    icon: (
      <i
        className="icon-[material-symbols--list-rounded]"
        role="img"
        aria-hidden="true"
      ></i>
    ),
    href: "/projects",
  },
  {
    id: "team",
    label: "team",
    icon: (
      <i
        className="icon-[ant-design--team-outlined]"
        role="img"
        aria-hidden="true"
      ></i>
    ),
    href: "/team",
  },
];

export function useSidebar() {
  const pathname = usePathname();

  const currentItem = navigationItems.find((item) => pathname === item.href);
  const selectedId = currentItem?.id || "dashboard";

  return {
    selectedId,
    items: navigationItems,
  };
}
