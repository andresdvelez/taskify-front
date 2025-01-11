import { Carousel } from "@/modules/auth/sign-in/components/Carousel";
import { IntegrationModal } from "@/modules/auth/sign-in/components/IntegrationModal";
import { SignInForm } from "@/modules/auth/sign-in/template/SignInForm";
import { Logo } from "@/modules/common/components/Logo";

const SignIn = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="p-8 flex flex-col">
        <div className="flex justify-between items-center w-full">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <SignInForm />
        </div>
      </div>
      <div className="hidden lg:block relative bg-muted p-8">
        <div className="absolute inset-4">
          <Carousel />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <IntegrationModal />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
