import Profession from "@/app/_domain/interfaces/Profession";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import { DefaultValues, useForm } from "react-hook-form";

const getDefaultRequirement = (
  statementOfWork: StatementOfWork,
  professions: Profession[]
): Requirement => ({
  id: undefined,
  coverage: 0,
  professionId: professions[0]?.id,
  startDate: statementOfWork.startDate,
  endDate: statementOfWork.endDate,
  statementOfWorkId: statementOfWork.id as number,
});

type Props = {
  requirement?: Requirement;
  statementOfWork: StatementOfWork;
};

const useRequirementFormController = ({
  statementOfWork,
  requirement,
}: Props) => {
  const { professions, isLoading } = useProfessionsController();

  const defaultValues = mergeObjects(
    getDefaultRequirement(statementOfWork, professions || []),
    requirement || {}
  ) as DefaultValues<Requirement>;

  const { handleSubmit, control } = useForm<Requirement>({
    defaultValues,
  });

  return {
    handleSubmit,
    control,
    isLoading,
    professions,
  };
};

export default useRequirementFormController;
