import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignUpForm, signUpSchema } from "../lib/validations/sign-up";
import { signUpWithToken } from "../services/sign-up";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useAuthStore } from "@/store/auth-store";

export function useSignUp(token: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await signUpWithToken({
        token,
        ...data,
      });

      setUser(userData);
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  });

  return {
    register,
    errors,
    isLoading,
    error,
    onSubmit,
  };
}
