"use client";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Fragment } from 'react';

import { UserSkill } from '@/app/_domain/interfaces/Skill';
import { User } from '@/app/_domain/interfaces/User';

import SkillsList from '../SkillsList';

type Props = {
  onExpand: (userId: string | null) => void;
  selectedUser: string | null;
  userSkills: UserSkill[] | undefined;
  users: User[] | undefined;
};

const UsersTable = ({
  users, 
  onExpand, 
  selectedUser, 
  userSkills 
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell component="th" scope="row">Users</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <Fragment key={user.id}>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => onExpand(selectedUser == user.id ? null : user.id!.toString())}
                  >
                    {selectedUser == user.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <SkillsList 
                user={user}
                userSkills={userSkills} 
                selectedUser={selectedUser} 
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
