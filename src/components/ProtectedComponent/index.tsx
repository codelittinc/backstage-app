import usePermissionsController from "./_presenters/controllers/usePermissionsController";

interface Props {
  ability: string;
  children: React.ReactNode | React.ReactNode[];
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
