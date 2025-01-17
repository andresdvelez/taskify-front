import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export const IntegrationModal = () => {
  return (
    <Card
      className="w-[350px] h-[350px] bg-white/85 relative overflow-visible"
      shadow="sm"
    >
      <div className="w-[250px] h-[100px] rounded-lg backdrop-blur-sm bg-white/30 absolute -top-6 -right-20 border border-white/40"></div>
      <div className="w-[250px] h-[100px] rounded-lg backdrop-blur-sm bg-white/30 absolute -bottom-6 -left-6 border border-white/40"></div>
      <CardHeader className="space-y-2 flex-col"></CardHeader>
      <CardBody className="space-y-2"></CardBody>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};
