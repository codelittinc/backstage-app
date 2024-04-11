import { Box, Card } from "@mui/material";

import Typography from "../Typography";

type Props = {
  metric: number | string;
  text: string;
};

const MetricCard = ({ text, metric }: Props) => {
  const value = typeof metric === "string" ? metric : metric.toFixed(1);
  return (
    <Card>
      <Box
        padding={5}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography>{value}</Typography>
        <Typography variant="h6">{text}</Typography>
      </Box>
    </Card>
  );
};

export default MetricCard;
