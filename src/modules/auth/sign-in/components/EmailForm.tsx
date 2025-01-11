import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { AuthFormProps } from "@/types/auth";

export const EmailForm = ({ onSubmit, isSubmitting }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
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
      <Button type="submit" color="primary" isLoading={isSubmitting} fullWidth>
        Send 4-digit code
      </Button>
    </form>
  );
};
