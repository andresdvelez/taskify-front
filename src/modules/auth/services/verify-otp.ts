import { user } from "@/data/user-test";

export const verifyOTP = async (email: string, otp: string) => {
  console.log(email, otp);
  return user;
  // Implement your API call here
  // const response = await fetch('/api/verify-otp', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, otp })
  // });
  // return response.json();
};
