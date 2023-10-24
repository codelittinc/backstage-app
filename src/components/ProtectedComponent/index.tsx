import useCurrentUserController from "@/app/_presenters/controllers/useCurrentUserController";
import Permission from "@/app/_domain/interfaces/Permission";
import usePermissionsController from "./_presenters/controllers/usePermissionsController";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  ability: string;
  target: string;
}

const ProtectedComponent = ({ children, ability, target }: Props) => {
  const { hasPermission } = usePermissionsController({ ability, target });

  if (hasPermission) {
    return children;
  }

  return null;
};

export default ProtectedComponent;
