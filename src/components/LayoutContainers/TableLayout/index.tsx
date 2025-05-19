"use client";
import { Grid, Icon } from "@mui/material";
import Card from "@mui/material/Card";

import Box from "@/components/Box";
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import Loading from "@/components/Loading";

interface Props {
  buttonLabel?: string;
  columns: any[];
  isLoading: boolean;
  onClickNew?: () => void;
  rows: any[];
  sortable?: boolean;
  children?: React.ReactNode;
}

function TableLayout({
  columns,
  rows,
  isLoading,
  onClickNew,
  buttonLabel,
  sortable = false,
  children,
}: Props): JSX.Element {
  const data = {
    columns: columns,
    rows: rows,
  };

  return (
    <DashboardLayout>
      <Box>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box pb={3}>
              {buttonLabel ? (
                <Button variant="gradient" color="info" onClick={onClickNew}>
                  <Icon>add</Icon>&nbsp; {buttonLabel}
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            {children}
            <Card>
              {isLoading ? (
                <Loading />
              ) : (
                <DataTable
                  table={data}
                  entriesPerPage={false}
                  canSearch
                  isSorted={sortable}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default TableLayout;
