import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
} from "@nextui-org/react";
import React from "react";

export const IntegrationModal = () => {
  return (
    <Card className="w-[440px]">
      <CardHeader className="space-y-2 flex-col">
        <div className="flex items-center gap-2 justify-center">
          <div className="p-2 bg-black rounded-lg">
            <div className="h-6 w-6" />
          </div>
          <div className="text-2xl">→</div>
          <div className="p-2 bg-[#5C6BC0] rounded-lg">
            <div className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-center">
          Connect Untitled to Linear
        </h2>
        <p className="text-center text-muted-foreground">
          Prioritize work based on customer needs and build a tighter feedback
          loop with your customers.
        </p>
      </CardHeader>
      <CardBody className="space-y-2">
        <div className="space-y-4">
          <Checkbox className=" text-primary">
            Access basic company information and details
          </Checkbox>
          <Checkbox className=" text-primary">
            Access and edit bug reports and create new issues
          </Checkbox>
          <Checkbox className=" text-primary">
            Change issue status and assignee of issues
          </Checkbox>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button variant="bordered">How it works</Button>
        <div className="space-x-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Allow access</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
