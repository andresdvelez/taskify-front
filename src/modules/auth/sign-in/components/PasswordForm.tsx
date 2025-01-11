import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { PasswordFormProps } from "@/types/auth";
import { useTranslations } from "next-intl";

export const PasswordForm = ({
  onSubmit,
  onBack,
  isSubmitting,
}: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const t = useTranslations("sign-in");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t("sign-in-with-password")}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("email", {
            required: t("errors.email-is-required"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("please-enter-a-valid-email-address"),
            },
          })}
          type="email"
          label={t("email")}
          placeholder="amelie@untitledui.com"
          errorMessage={errors.email?.message as string}
          isInvalid={!!errors.email}
          fullWidth
        />
        <Input
          {...register("password", {
            required: t("password-is-required"),
            minLength: {
              value: 8,
              message: t("errors.password-must-be-at-least-8-characters"),
            },
          })}
          type="password"
          label={t("password")}
          placeholder={t("enter-your-password")}
          errorMessage={errors.password?.message as string}
          isInvalid={!!errors.password}
          fullWidth
        />
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          fullWidth
        >
          {t("sign-in")}
        </Button>
        <Button variant="bordered" onPress={onBack} fullWidth>
          {t("back-to-otp-sign-in")}
        </Button>
      </form>
    </div>
  );
};
