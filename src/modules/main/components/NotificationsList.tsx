import { ScrollShadow } from "@nextui-org/react";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/types/notification";

interface NotificationsListProps {
  notifications: Notification[];
  onDelete: (id: string) => void;
}

export const NotificationsList = ({
  notifications,
  onDelete,
}: NotificationsListProps) => {
  return (
    <ScrollShadow className="max-h-[500px]">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDelete={onDelete}
        />
      ))}
    </ScrollShadow>
  );
};
