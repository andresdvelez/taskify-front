import { Button } from "@nextui-org/react";

export const CreateNewBtn = () => {
  return (
    <Button
      variant="solid"
      className="bg-black text-white"
      endContent={
        <i
          className="icon-[lucide--plus] text-lg"
          role="img"
          aria-hidden="true"
        ></i>
      }
    >
      Create new
    </Button>
  );
};
