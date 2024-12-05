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
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={selectedUser == user.id} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Skills:
            </Typography>
            {userSkills?.map(({ id, skill }) => (
              <Chip key={id} label={skill.name} style={{ margin: 2 }} />
            ))}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default SkillsList;
