import Permission from "@/app/_domain/interfaces/Permission";
import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";

interface Props {
  ability: string;
  target: string;
}

const usePermissions = ({ ability, target }: Props) => {
  const { currentUser } = useCurrentUserController();

  const userHasPermission = !!currentUser?.permissions?.find(
    (permission: Permission) =>
      permission.ability === ability && permission.target === target
  );

  return {
    hasPermission: userHasPermission,
  };
};

export default usePermissions;
