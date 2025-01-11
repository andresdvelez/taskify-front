import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { OTPFormProps } from "@/types/auth";

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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Enter Code</h1>
        <p className="text-sm text-gray-500">
          We sent a 4-digit code to {email}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("otp", {
            required: "OTP is required",
            pattern: {
              value: /^[0-9]{4}$/,
              message: "Please enter a valid 4-digit code",
            },
          })}
          type="text"
          label="Code"
          inputMode="numeric"
          maxLength={4}
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
          Verify Code
        </Button>
        <Button variant="bordered" onPress={onBack} fullWidth>
          Back to email
        </Button>
      </form>
    </div>
  );
};
