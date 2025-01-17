import { BACKEND_URL } from "@/modules/constants/backend-url";
import { Notification } from "@/types/notification";
import axios from "axios";

export const notificationService = {
  async getNotifications(
    userId: string,
    token: string
  ): Promise<Notification[]> {
    const { data: notifications } = await axios.get(
      `${BACKEND_URL}/users/get-notifications/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!notifications) throw new Error("Failed to fetch notifications");
    return notifications;
  },

  async deleteNotification(
    id: string,
    userId: string,
    token: string
  ): Promise<void> {
    const { data: response } = await axios.delete(
      `${BACKEND_URL}/users/delete-notification/${id}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to delete notification");
  },
};
