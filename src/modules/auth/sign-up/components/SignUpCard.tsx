import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import SignUpForm from "./SignUpForm";

export default function SignUpCard({ token }: { token?: string }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-2 p-6">
        <h1 className="text-2xl font-bold text-center">
          Complete Your Account
        </h1>
        <p className="text-sm text-gray-500 text-center">
          You&apos;ve been invited to join the team. Please complete your
          registration.
        </p>
      </CardHeader>
      <Divider />
      <CardBody className="p-6">
        <SignUpForm token={token} />
      </CardBody>
    </Card>
  );
}
