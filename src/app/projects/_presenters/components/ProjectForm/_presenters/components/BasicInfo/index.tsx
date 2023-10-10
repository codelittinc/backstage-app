import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import FormField from "@/components/FormField";
import useCustomersController from "@/app/customers/_presenters/controllers/useCustomersController";
import Autocomplete from "@/components/Autocomplete";
import Loading from "@/components/Loading";

function BasicInfo({
  project,
  onChange,
  onSave,
}: {
  project: Project;
  onChange: Function;
  onSave: Function;
}): JSX.Element {
  const { name, customer } = project;
  const { customers, isLoading } = useCustomersController();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <Box p={3}>
        <Typography variant="h5">Basic Info</Typography>
      </Box>
      <Box component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              label="Name"
              placeholder="Backstage"
              value={name}
              onChange={({ target: { value } }) => {
                onChange({
                  ...project,
                  name: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              label={"Customer"}
              value={
                customers.find((c: Customer) => c.id === customer.id) ||
                customers[0]
              }
              defaultValue={customers[0]}
              getOptionLabel={(option: Customer) => option.name}
              onChange={(value: Customer) => {
                onChange({
                  ...project,
                  customer: value,
                });
              }}
              options={customers}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
          <Box
            display="flex"
            justifyContent={{ md: "flex-end" }}
            alignItems="center"
          >
            <Button
              variant="gradient"
              color="dark"
              size="small"
              onClick={() => onSave()}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
}

export default BasicInfo;
