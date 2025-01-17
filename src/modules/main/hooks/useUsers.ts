import { useState, useEffect } from "react";
import { IUser } from "@/types/user.interface";
import { fetchUsers } from "../services/fetchUsers";

export const useUsers = (userId: string, token: string) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchUsers(token);
        setUsers(data);
      } catch {
        setError("Failed to load team members");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [userId, token]);

  return { users, isLoading, error };
};
