import Profession from "@/app/_domain/interfaces/Profession";
import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import useProfessionsController from "@/app/_presenters/controllers/useProfessionsController";
import { mergeObjects } from "@/app/_presenters/utils/objects";
import projectTabs from "@/app/projects/_domain/_enums/projectTabs";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";

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
  const router = useRouter();

  const defaultValues = mergeObjects(
    getDefaultRequirement(statementOfWork, professions || []),
    requirement || {}
  ) as DefaultValues<Requirement>;

  const { handleSubmit, control } = useForm<Requirement>({
    defaultValues,
  });

  return {
    handleSubmit: (onValid: SubmitHandler<Requirement>) => {
      router.push(
        routes.projectPath(statementOfWork.projectId, projectTabs.resources)
      );
      return handleSubmit(onValid);
    },
    control,
    isLoading,
    professions,
  };
};

export default useRequirementFormController;
