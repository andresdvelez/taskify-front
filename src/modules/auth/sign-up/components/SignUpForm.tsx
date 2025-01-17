"use client";

import { Input, Button } from "@nextui-org/react";
import { useSignUp } from "../../hooks/useSignup";

export default function SignUpForm({ token }: { token?: string }) {
  const { register, errors, isLoading, error, onSubmit } = useSignUp(token!);

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-danger-50 text-danger rounded-medium text-sm">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("firstName")}
              label="First Name"
              variant="bordered"
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message}
            />
          </div>
          <div>
            <Input
              {...register("lastName")}
              label="Last Name"
              variant="bordered"
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message}
            />
          </div>
        </div>
        <Input
          {...register("password")}
          type="password"
          label="Password"
          variant="bordered"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Input
          {...register("confirmPassword")}
          type="password"
          label="Confirm Password"
          variant="bordered"
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button
          type="submit"
          color="primary"
          className="w-full"
          isLoading={isLoading}
        >
          Complete Registration
        </Button>
      </form>
    </>
  );
}
