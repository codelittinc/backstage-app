import { Box, Grid, Switch, Typography } from "@mui/material";

import { ContractModel } from "@/app/_domain/interfaces/StatementOfWork";

interface Props {
  contractModel: ContractModel;
  onChange: (key: string, value: string | number | boolean | undefined) => {};
}

const FixedBidContractModel = ({ contractModel, onChange }: Props) => {
  const { fixedTimeline } = contractModel;

  return (
    <Grid item xs={12}>
      <Box display="flex" alignItems="center">
        <Typography variant="caption" fontWeight="regular">
          Fixed Timeline
        </Typography>
        <Switch
          checked={fixedTimeline}
          onChange={() => onChange("fixedTimeline", !fixedTimeline)}
        />
      </Box>
    </Grid>
  );
};

export default FixedBidContractModel;
