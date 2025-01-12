import { useState } from "react";
import { sendOTP } from "../services/send-otp";
import { verifyOTP } from "../services/verify-otp";
import { signInWithPassword } from "../services/sign-in-with-password";
import { error } from "@/types/errors";
import { useRouter } from "@/modules/translations/i18n/routing";
import { useAuthStore } from "@/store/auth-store";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser, signOut } = useAuthStore();

  const handleSendOTP = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await sendOTP(email);
      return true;
    } catch (err) {
      setError((err as error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (email: string, otp: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await verifyOTP(email, otp);
      setUser(user);
      router.push(`/dashboard`);
      return true;
    } catch (err) {
      setError((err as error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithPassword = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await signInWithPassword(email, password);
      setUser(user);
      router.push(`/dashboard`);
      return true;
    } catch (err) {
      setError((err as error).message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      signOut();
      router.push(`/sign-in`);
    } catch (err) {
      setError((err as error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleSendOTP,
    handleVerifyOTP,
    handleSignInWithPassword,
    handleSignOut,
  };
};
