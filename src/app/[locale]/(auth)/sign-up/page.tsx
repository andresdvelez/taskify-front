import { Metadata } from "next";

import { redirect } from "@/modules/translations/i18n/routing";
import SignUpCard from "@/modules/auth/sign-up/components/SignUpCard";

export const metadata: Metadata = {
  title: "Sign Up | Taskify",
  description: "Complete your team invitation registration",
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; locale: string }>;
}) {
  const token = (await searchParams).token;
  const locale = (await searchParams).locale;

  if (!token) {
    redirect({ href: "/sign-in", locale });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <SignUpCard token={token} />
    </main>
  );
}
