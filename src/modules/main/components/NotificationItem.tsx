import { Notification } from "@/types/notification";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";

interface NotificationItemProps {
  notification: Notification;
  onDelete: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onDelete,
}: NotificationItemProps) => {
  return (
    <Card className="w-full mb-2 bg-gray-100" shadow="none">
      <CardBody className="py-2">
        <p className="text-sm">{notification.message}</p>
      </CardBody>
      <CardFooter className="justify-end py-2">
        <Button
          color="danger"
          variant="light"
          size="sm"
          onPress={() => onDelete(notification.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
