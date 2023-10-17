"use client";
import Card from "@mui/material/Card";
import Box from "@/components/Box";
import DashboardLayout from "@/components/LayoutContainers/DashboardLayout";
import { Grid, Icon } from "@mui/material";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import DataTable from "@/components/DataTable";

interface Props {
  columns: any[];
  rows: any[];
  isLoading: boolean;
  onClickNew?: () => void;
  buttonLabel?: string;
}

function TableLayout({
  columns,
  rows,
  isLoading,
  onClickNew,
  buttonLabel,
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
            <Card>
              {isLoading ? (
                <Loading />
              ) : (
                <DataTable table={data} entriesPerPage={false} canSearch />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default TableLayout;
