import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CreateNewBtn } from "../components/CreateNewBtn";
import { NotificationsBtn } from "../components/NotificationsBtn";

export const DashboardPage = () => {
  return (
    <Card as="section" shadow="sm" radius="md" className="px-4 py-2 w-full">
      <CardHeader className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="font-semibold text-xl">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Monitor, Evaluate & Enhace your perfornace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <NotificationsBtn />
          <CreateNewBtn />
        </div>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};
