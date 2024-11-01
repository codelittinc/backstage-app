"use client";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment } from 'react';

import Loading from "@/components/Loading";

import Footer from "./presenters/components/Footer";
import SkillsList from './presenters/components/SkillsList';
import SkillsSearch from './presenters/components/SkillsSearch';
import useReportsController from "./presenters/controllers/useReportsController";

const UsersDashboard = () => {
  const {
    users,
    onSearch,
    query,
    setQuery,
    isLoading,
    onExpand,
    selectedUser,
    userSkills,
    onKeyPress
  } = useReportsController();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container>
      <Grid item xs={12} padding={5}>
        <Grid xs={12} justifyContent={"center"} display="flex" mb={3}>
          <Typography variant={"h2"} ml={2}>
            Skills Search
          </Typography>
        </Grid>
        <Grid xs={12} display={"flex"} justifyContent={"center"}>
          <Grid md={5} xs={12}>
            <SkillsSearch
              onSearch={onSearch}
              query={query}
              setQuery={setQuery}
              onKeyPress={onKeyPress}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={"space-around"} display="flex" mt={5}>
          <Grid item xs={12} md={12} pb={12}>
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
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default UsersDashboard;
