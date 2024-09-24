import { useState } from 'react';

import { Skill } from '@/app/_domain/interfaces/Skill';

const useSkillFormController = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return {
    selectedSkill,
    setSelectedSkill,
  };
};

export default useSkillFormController;
