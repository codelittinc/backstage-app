import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { StatementOfWork } from "@/app/_domain/interfaces/StatementOfWork";
import { useAppStore } from "@/app/_presenters/data/store/store";
import {
  createTimeEntry,
  updateTimeEntry,
} from "@/app/timesheets/_presenters/data/timeEntries";
import { TimeEntry } from "@/app/timesheets/_presenters/domain/types/TimeEntry";

type Props = {
  date: string;
  onChangeCell: () => void;
  statementOfWork: StatementOfWork;
  timeEntry?: TimeEntry;
  userId: number;
};

const useTableCellController = ({
  date,
  timeEntry,
  userId,
  statementOfWork,
  onChangeCell,
}: Props) => {
  const { showSaveSuccessAlert } = useAppStore();
  const timeEntryExists = !!timeEntry?.id;

  const mutation = useMutation({
    mutationFn: timeEntryExists ? updateTimeEntry : createTimeEntry,
    onSuccess: () => {
      onChangeCell();
      showSaveSuccessAlert();
    },
  });

  const [hours, setHours] = useState<number>(timeEntry?.hours || 0);

  if (!userId) {
    return {
      onChange: (e) => setHours(Number(e.target.value)),
    };
  }

  const defaultValues = {
    date: date,
    hours: 0,
    statementOfWorkId: Number(statementOfWork.id!),
    userId: userId,
    id: undefined,
  };
  const values = timeEntry || defaultValues;

  return {
    save: () => {
      if (hours !== values.hours) {
        mutation.mutate({
          ...values,
          hours: hours || 0,
        });
      }
    },
    onChange: (e) => setHours(e.target.value),
    hours: hours,
  };
};

export default useTableCellController;
