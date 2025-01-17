import { useState } from "react";
import { notificationService } from "../services/notificationService";
import { useNotificationsStore } from "@/store/notifications-store";

export const useNotifications = (userId: string, authToken: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { notifications, setNotifications, removeNotification } =
    useNotificationsStore();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getNotifications(
        userId,
        authToken
      );
      setNotifications(data);
      setError(null);
    } catch {
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const deleteNotification = async (notificationId: string) => {
    try {
      removeNotification(notificationId);

      await notificationService.deleteNotification(
        notificationId,
        userId,
        authToken
      );
    } catch {
      fetchNotifications();
      setError("Failed to delete notification");
    }
  };

  return {
    notifications,
    loading,
    error,
    deleteNotification,
    fetchNotifications,
  };
};
