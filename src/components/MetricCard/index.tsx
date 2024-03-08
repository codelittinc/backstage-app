import { Box, Card } from "@mui/material";
import Typography from "../Typography";

type Props = {
  text: string;
  metric: number;
};

const MetricCard = ({ text, metric }: Props) => {
  return (
    <Card>
      <Box
        padding={5}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography>{metric.toFixed(1)}</Typography>
        <Typography variant="h6">{text}</Typography>
      </Box>
    </Card>
  );
};

export default MetricCard;
