import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { PasswordFormProps } from "@/types/auth";

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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Sign in with Password</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          })}
          type="email"
          label="Email"
          placeholder="amelie@untitledui.com"
          errorMessage={errors.email?.message as string}
          isInvalid={!!errors.email}
          fullWidth
        />
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          type="password"
          label="Password"
          placeholder="Enter your password"
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
          Sign in
        </Button>
        <Button variant="bordered" onPress={onBack} fullWidth>
          Back to OTP sign in
        </Button>
      </form>
    </div>
  );
};
