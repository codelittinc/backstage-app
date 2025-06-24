"use client";
import Link from "next/link";
import { useState } from "react";
import {
  FormControlLabel,
  Switch,
  Box,
  Grid,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";

import TableLayout from "@/components/LayoutContainers/TableLayout";
import PageFilterContainer from "@/components/PageFilters/PageFilterContainer";
import routes from "@/routes";

import useUsersController from "../_presenters/controllers/useUsersController";
import useProjectsController from "../projects/_presenters/controllers/useProjectsController";
import useProfessionsController from "../_presenters/controllers/useProfessionsController";

function Users(): JSX.Element {
  // Filter state - active, internal, and rehireable true by default
  const [filterActive, setFilterActive] = useState(true);
  const [filterInternal, setFilterInternal] = useState(true);
  const [filterRehireable, setFilterRehireable] = useState(true);
  const [selectedProfessions, setSelectedProfessions] = useState<number[]>([]);

  const { professions = [] } = useProfessionsController();
  const { users = [], isLoading } = useUsersController(
    filterActive,
    filterInternal,
    filterRehireable,
    selectedProfessions
  );
  const { projects } = useProjectsController();
  const reportKey = projects?.find(
    (project: Project) => project.reportKey
  )?.reportKey;

  const columns = [
    {
      Header: "Name",
      accessor: "fullName",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { fullName, slug },
        } = row;
        return <Link href={routes.userPath(slug)}>{fullName}</Link>;
      },
    },
    {
      Header: "Email",
      accessor: "email",
      width: "20%",
    },
    {
      Header: "Profession",
      accessor: "profession",
      width: "20%",
      Cell: ({ row }: any) => {
        const {
          original: { profession, id },
        } = row;

        return <>{profession?.name}</>;
      },
    },
    {
      Header: "Active",
      accessor: "active",
      width: "10%",
      Cell: ({ row }: any) => {
        const {
          original: { active },
        } = row;
        return active ? "Yes" : "No";
      },
    },
    {
      Header: "Rehireable",
      accessor: "rehireable",
      width: "15%",
      Cell: ({ row }: any) => {
        const {
          original: { rehireable },
        } = row;
        return rehireable ? "Yes" : "No";
      },
    },
  ];

  return (
    <>
      <TableLayout columns={columns} rows={users} isLoading={isLoading}>
        <Box display="flex" justifyContent="flex-end">
          <Link href={routes.usersReportPath(reportKey)}>User reports</Link>
        </Box>
        <PageFilterContainer>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={filterActive}
                    onChange={(e) => setFilterActive(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Active Only"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={filterInternal}
                    onChange={(e) => setFilterInternal(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Internal Only"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={filterRehireable}
                    onChange={(e) => setFilterRehireable(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Rehireable Only"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Autocomplete
                multiple
                options={professions || []}
                getOptionLabel={(option) => option.name}
                value={(professions || []).filter((profession) =>
                  selectedProfessions.includes(profession.id)
                )}
                onChange={(event, newValue) => {
                  setSelectedProfessions(newValue.map((prof) => prof.id));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.name}
                      {...getTagProps({ index })}
                      key={option.id}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter by Profession"
                    placeholder="Select professions..."
                    size="small"
                  />
                )}
                size="small"
              />
            </Grid>
          </Grid>
        </PageFilterContainer>
      </TableLayout>
    </>
  );
}

export default Users;
