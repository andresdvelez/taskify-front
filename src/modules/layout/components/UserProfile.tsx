import { useSignOut } from "@/modules/common/hooks/useSignOut";
import { useAuthStore } from "@/store/auth-store";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";

export function UserProfile() {
  const user = useAuthStore((state) => state.user);

  const { isLoading, signOut } = useSignOut();

  const t = useTranslations("sidebar");

  if (!user) return null;

  return (
    <div className="flex items-center justify-between p-0">
      <User
        avatarProps={{
          src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        }}
        description={user.email}
        name={`${user.firstName} ${user.lastName}`}
      />
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
