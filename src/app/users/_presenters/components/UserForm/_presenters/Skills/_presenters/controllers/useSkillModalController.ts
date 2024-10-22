import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import tanstackKeys from '@/app/_domain/enums/tanstackKeys';
import { createSkill } from '@/app/_presenters/data/skills';
import { useAppStore } from '@/app/_presenters/data/store/store';

const useSkillModalController = () => {
  const queryClient = useQueryClient();
  const { showSaveSuccessAlert } = useAppStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string; }) => createSkill({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [tanstackKeys.Skills],
      });
      showSaveSuccessAlert();
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    mutation.mutate({ name: formJson.name })
    setIsOpen(false);
  }

  return {
    isOpen,
    setIsOpen,
    onSubmit
  };
};

export default useSkillModalController;
