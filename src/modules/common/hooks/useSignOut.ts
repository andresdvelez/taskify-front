import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/modules/translations/i18n/routing";
import Cookies from "js-cookie";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("auth");

  const router = useRouter();

  const signOut = async () => {
    setIsLoading(true);
    try {
      Cookies.remove("auth-storage");
      Cookies.remove("project-storage");
      router.push(`/sign-in`);
      toast.success(t("sign-out-success"));
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error(t("sign-out-error"));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signOut,
    isLoading,
  };
};
