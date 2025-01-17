"use client";

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationsList } from "./NotificationsList";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationsStore } from "@/store/notifications-store";

export const NotificationsBtn = () => {
  const user = useAuthStore((state) => state.user);
  const notifications = useNotificationsStore((state) => state.notifications);

  const { loading, error, deleteNotification, fetchNotifications } =
    useNotifications(user?.id as string, user?.authToken as string);

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <Popover
      placement="bottom-end"
      onOpenChange={(isOpen) => {
        if (isOpen && user?.id) {
          fetchNotifications();
        }
      }}
    >
      <PopoverTrigger className="overflow-visible">
        <Button className="border text-lg" variant="ghost" isIconOnly>
          <i
            className="icon-[material-symbols--notifications-outline]"
            role="img"
            aria-hidden="true"
          />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-danger text-xs text-white flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="px-4 py-3 w-80">
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          {loading && <p className="text-center py-2">Loading...</p>}
          {error && <p className="text-danger text-center py-2">{error}</p>}
          {!loading && notifications.length === 0 && (
            <p className="text-center py-2 text-gray-500">No notifications</p>
          )}
          {!loading && notifications.length > 0 && (
            <NotificationsList
              notifications={notifications}
              onDelete={deleteNotification}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
