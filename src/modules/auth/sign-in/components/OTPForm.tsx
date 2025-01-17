import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { OTPFormProps } from "@/types/auth";
import { useTranslations } from "next-intl";

export const OTPForm = ({
  onSubmit,
  onBack,
  email,
  isSubmitting,
}: OTPFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const t = useTranslations("sign-in");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t("enter-code")}</h1>
        <p className="text-sm text-gray-500">
          {`${t("we-sent-a-4-digit-code-to")} ${email}`}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("otp", {
            required: t("errors.otp-is-required"),
            pattern: {
              value: /^[0-9]{6}$/,
              message: t("please-enter-a-valid-4-digit-code"),
            },
          })}
          type="text"
          label={t("code")}
          inputMode="numeric"
          maxLength={6}
          placeholder="0000"
          errorMessage={errors.otp?.message as string}
          isInvalid={!!errors.otp}
          fullWidth
          className="text-center text-xl tracking-widest"
        />
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          fullWidth
        >
          {t("verify-code")}
        </Button>
        <Button variant="bordered" onPress={onBack} fullWidth>
          {t("back-to-email")}
        </Button>
      </form>
    </div>
  );
};
