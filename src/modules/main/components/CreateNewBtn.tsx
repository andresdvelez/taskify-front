"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { CreateNewModal } from "./create-new/CreateNewModal";
import { useAuthStore } from "@/store/auth-store";

export const CreateNewBtn = () => {
  const user = useAuthStore((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <>
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
        onPress={() => setIsModalOpen(true)}
      >
        Create new
      </Button>

      <CreateNewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
