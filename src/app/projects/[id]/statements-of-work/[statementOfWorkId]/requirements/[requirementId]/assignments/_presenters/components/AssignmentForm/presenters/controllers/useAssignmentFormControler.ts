import { User } from "@/app/_domain/interfaces/User";
import useUsersController from "@/app/_presenters/controllers/useUsersController";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import { useRouter } from "next/navigation";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  assignment?: Assignment;
  requirement: Requirement;
};

const getDefaultRequirement = (
  requirement: Requirement,
  users: User[]
): Assignment => ({
  id: undefined,
  coverage: requirement.coverage,
  userId: (users[0]?.id as number) ?? 0,
  startDate: requirement.startDate,
  endDate: requirement.endDate,
  requirementId: requirement.id as number,
  statementOfWorkId: requirement.statementOfWorkId as number,
});

const useAssignmentFormController = ({ assignment, requirement }: Props) => {
  const { users, isLoading } = useUsersController();
  const router = useRouter();

  const defaultValues = mergeObjects(
    getDefaultRequirement(requirement, users || []),
    assignment || {}
  ) as DefaultValues<Assignment>;

  const { handleSubmit, control } = useForm<Assignment>({
    defaultValues,
  });

  return {
    users,
    isLoading,
    handleSubmit: (onValid: SubmitHandler<Assignment>) => {
      router.back();
      return handleSubmit(onValid);
    },
    control,
  };
};

export default useAssignmentFormController;
