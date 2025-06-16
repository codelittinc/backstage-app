import { useState } from "react";
import { User } from "@/app/_domain/interfaces/User";
import { updateUser } from "@/app/_presenters/data/users";

export type UseUserHistoryControllerProps = User;

export default function useUserHistoryController(
  initialUser: UseUserHistoryControllerProps
) {
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const handleUserUpdate = async (updatedUser: User) => {
    try {
      setIsLoading(true);
      const savedUser = await updateUser(updatedUser);
      setUser(savedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isEditing,
    isLoading,
    startEditing,
    stopEditing,
    handleUserUpdate,
  };
}
