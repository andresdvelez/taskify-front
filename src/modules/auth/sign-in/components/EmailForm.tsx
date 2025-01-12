import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { AuthFormProps } from "@/types/auth";
import { useTranslations } from "next-intl";

export const EmailForm = ({ onSubmit, isSubmitting }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const t = useTranslations("sign-in");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register("email", {
          required: t("errors.email-is-required"),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("errors.please-enter-a-valid-email-address"),
          },
        })}
        type="email"
        label={t("email")}
        placeholder="amelie@untitledui.com"
        errorMessage={errors.email?.message as string}
        isInvalid={!!errors.email}
        fullWidth
      />
      <Button type="submit" color="primary" isLoading={isSubmitting} fullWidth>
        {t("send-4-digit-code")}
      </Button>
    </form>
  );
};
