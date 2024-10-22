import { useEffect, useState } from 'react';

import { Skill, UserSkill } from '@/app/_domain/interfaces/Skill';

interface Props {
  skills?: Skill[] | null;
  userSkill?: UserSkill;
}

const useSkillFormController = ({ skills, userSkill }: Props) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (skills && userSkill?.skillId) {
      const skill = skills.find((s) => s.id === userSkill.skillId);
      setSelectedSkill(skill || null);
    }
  }, [skills, userSkill, setSelectedSkill]);

  return {
    selectedSkill
  };
};

export default useSkillFormController;
