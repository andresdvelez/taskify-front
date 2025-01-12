"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { EmailForm } from "../components/EmailForm";
import { Button } from "@nextui-org/react";
import { OTPForm } from "../components/OTPForm";
import { PasswordForm } from "../components/PasswordForm";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const SignInForm = () => {
  const [authMode, setAuthMode] = useState<"email" | "otp" | "password">(
    "email"
  );
  const [email, setEmail] = useState("");
  const {
    isLoading,
    error,
    handleSendOTP,
    handleVerifyOTP,
    handleSignInWithPassword,
  } = useAuth();

  const t = useTranslations("sign-in");

  const handleEmailSubmit = async (data: { email: string }) => {
    const success = await handleSendOTP(data.email);
    if (success) {
      setEmail(data.email);
      setAuthMode("otp");
    }
  };

  const handleOTPSubmit = async (data: { otp: string }) => {
    const success = await handleVerifyOTP(email, data.otp);
    if (success) {
      toast.success(t("alerts.verification-successful"));
    }
  };

  const handlePasswordSubmit = async (data: {
    email: string;
    password: string;
  }) => {
    const success = await handleSignInWithPassword(data.email, data.password);
    if (success) {
      toast.success(t("alerts.sign-in-successful"));
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {error && (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
          {t(`errors.${error}`)}
        </div>
      )}

      {authMode === "email" && (
        <>
          <EmailForm onSubmit={handleEmailSubmit} isSubmitting={isLoading} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-500">
                {t("or")}
              </span>
            </div>
          </div>
          <Button
            variant="bordered"
            onPress={() => setAuthMode("password")}
            fullWidth
          >
            {t("sign-in-with-password")}
          </Button>
        </>
      )}

      {authMode === "otp" && (
        <OTPForm
          onSubmit={handleOTPSubmit}
          onBack={() => setAuthMode("email")}
          email={email}
          isSubmitting={isLoading}
        />
      )}

      {authMode === "password" && (
        <PasswordForm
          onSubmit={handlePasswordSubmit}
          onBack={() => setAuthMode("email")}
          isSubmitting={isLoading}
        />
      )}
    </div>
  );
};
