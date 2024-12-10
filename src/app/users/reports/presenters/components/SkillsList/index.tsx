import { Chip, Collapse, TableCell, TableRow, Typography } from "@mui/material";

import { UserSkill } from "@/app/_domain/interfaces/Skill";
import { User } from "@/app/_domain/interfaces/User";
import Box from "@/components/Box";

type Props = {
  selectedUser: string | null;
  user: User;
  userSkills: UserSkill[] | undefined;
};

const SkillsList = ({ selectedUser, userSkills, user }: Props) => {
  return (
    <TableCell
      style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
      colSpan={6}
    >
      <Collapse in={selectedUser == user.id} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          {userSkills?.length ? (
            userSkills.map(({ id, skill }) => (
              <Chip key={id} label={skill.name} style={{ margin: 2 }} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No skills have been added yet.
            </Typography>
          )}
        </Box>
      </Collapse>
    </TableCell>
  );
};

export default SkillsList;
