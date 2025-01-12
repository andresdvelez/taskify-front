"use client";

import { Logo } from "@/modules/common/components/Logo";
import { useSidebar } from "../hooks/useSidebar";
import { UserProfile } from "../components/UserProfile";
import { SidebarItem } from "../components/SidebarItem";
import { Card } from "@nextui-org/react";

export const Sidebar = () => {
  const { items, selectedId } = useSidebar();

  return (
    <aside className="flex flex-col w-80">
      {/* Logo */}
      <div className="pb-6 px-3">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
          />
        ))}
      </nav>

      {/* User Profile */}
      <Card className="bg-white p-2" radius="sm" shadow="sm">
        <UserProfile name="Andres Velez" email="andres082403@gmail.com" />
      </Card>
    </aside>
  );
};
