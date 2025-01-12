import { user } from "@/data/user-test";

export const signInWithPassword = async (email: string, password: string) => {
  console.log(email, password);
  return user;
  // Implement your API call here
  // const response = await fetch('/api/signin', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // });
  // return response.json();
};
