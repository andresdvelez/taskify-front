export interface AuthFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export interface OTPFormProps extends AuthFormProps {
  onBack: () => void;
  email: string;
}

export interface PasswordFormProps extends AuthFormProps {
  onBack: () => void;
}
