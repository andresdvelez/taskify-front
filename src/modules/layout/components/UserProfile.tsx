import { useSignOut } from "@/modules/common/hooks/useSignOut";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface UserProfileProps {
  name: string;
  email: string;
  imageUrl?: string;
}

export function UserProfile({ name, email, imageUrl }: UserProfileProps) {
  const { isLoading, signOut } = useSignOut();

  const t = useTranslations("sidebar");

  return (
    <div className="flex items-center justify-between p-0">
      <div className="flex items-center gap-3">
        <Avatar src={imageUrl} fallback={name[0]}></Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-gray-500">{email}</span>
        </div>
      </div>
      <Popover placement="top" radius="sm" shadow="md">
        <PopoverTrigger>
          <Button
            variant="ghost"
            radius="sm"
            className="border p-1 min-w-0 h-auto w-auto border-gray-200"
            isIconOnly
          >
            <i
              className="icon-[material-symbols--more-vert]"
              role="img"
              aria-hidden="true"
            ></i>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button
            variant="light"
            className="text-red-400"
            onPress={signOut}
            isLoading={isLoading}
            startContent={
              <i
                className="icon-[si--sign-out-duotone]"
                role="img"
                aria-hidden="true"
              ></i>
            }
          >
            {t("sign-out")}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
