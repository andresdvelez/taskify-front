import { Button } from "@nextui-org/react";
import React from "react";

export const NotificationsBtn = () => {
  return (
    <Button className="border text-lg" variant="ghost" isIconOnly>
      <i
        className="icon-[material-symbols--notifications-outline]"
        role="img"
        aria-hidden="true"
      ></i>
    </Button>
  );
};
