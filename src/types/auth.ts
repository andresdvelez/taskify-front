export interface AuthFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
