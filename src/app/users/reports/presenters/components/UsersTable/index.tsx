"use client";
import { Fragment } from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import DataTable from "@/components/DataTable";
import { UserSkill } from "@/app/_domain/interfaces/Skill";
import { User } from "@/app/_domain/interfaces/User";

import SkillsList from "../SkillsList";
import { Box } from "@mui/material";
import Typography from "@/components/Typography";

type Props = {
  onExpand: (userId: string | null) => void;
  selectedUser: string | null;
  userSkills: UserSkill[] | undefined;
  users: User[] | undefined;
};

const UsersTable = ({ users, onExpand, selectedUser, userSkills }: Props) => {
  // Transform the users data to include both user rows and skill rows
  const tableRows =
    users?.flatMap((user) => {
      const userRow = {
        ...user,
        isSkillRow: false,
      };
      const skillRow = {
        id: `${user.id}-skills`,
        isSkillRow: true,
        parentId: user.id,
        // Add any other necessary fields to avoid undefined errors
        fullName: "",
        email: "",
        active: false,
      };

      return [userRow, skillRow];
    }) || [];

  const tableData = {
    columns: [
      {
        Header: "Name",
        accessor: "fullName",
        width: "30%",
        Cell: ({ row }: any) => {
          const { original } = row;
          const { active } = original;
          if (original.isSkillRow) {
            return (
              <Box pl={4}>
                <SkillsList
                  user={users?.find((u) => u.id === original.parentId)}
                  userSkills={userSkills}
                  selectedUser={selectedUser}
                />
              </Box>
            );
          }

          const icon = (
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: active ? "#4caf50" : "#f44336",
                margin: "0 auto",
                marginRight: 10,
              }}
            />
          );

          return (
            <Box display={"flex"} alignItems={"center"}>
              {icon}
              {original.fullName}
            </Box>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        width: "30%",
        Cell: ({ row }: any) => {
          const { original } = row;
          if (original.isSkillRow) return null;
          return original.email;
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        width: "10%",
        Cell: ({ row }: any) => {
          const { original } = row;
          if (original.isSkillRow) return null;

          const isExpanded = selectedUser === original.id?.toString();

          return (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                onExpand(isExpanded ? null : original.id?.toString());
              }}
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          );
        },
      },
    ],
    rows: tableRows.filter(
      (row) =>
        !row.isSkillRow ||
        (row.isSkillRow &&
          row.parentId?.toString() === selectedUser?.toString())
    ),
  };

  return (
    <Fragment>
      <DataTable
        table={tableData}
        entriesPerPage={false}
        canSearch
        isSorted={true}
      />
    </Fragment>
  );
};

export default UsersTable;
