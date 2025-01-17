import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

export const ProjectNotFound = () => {
  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <h3>Project Not Found</h3>
      </CardHeader>
      <CardBody>
        <p>
          The project you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </CardBody>
    </Card>
  );
};
