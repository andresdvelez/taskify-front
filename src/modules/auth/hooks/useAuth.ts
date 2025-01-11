import { useState } from "react";
import { sendOTP } from "../services/send-otp";
import { verifyOTP } from "../services/verify-otp";
import { signInWithPassword } from "../services/sign-in-with-password";
import { error } from "@/types/errors";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      await verifyOTP(email, otp);
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
      await signInWithPassword(email, password);
      return true;
    } catch (err) {
      setError((err as error).message);
      return false;
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
  };
};
