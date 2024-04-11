import Loading from "@/components/Loading";
import useDynamicDatasetsController from "./_presenters/controllers/useDynamicDatasetsController";
import DynamicDataset from "./_domain/dynamicDataset";
import DynamicMetricCard from "./_presenters/components/DynamicMetricCard";
import Typography from "@/components/Typography";
import Box from "@/components/Box";

interface Props {
  endDateFilter?: string | undefined;
  interval: string;
  project: Project;
  startDateFilter?: string | undefined;
}

const AVAILABLE_COMPONENTS = [
  {
    component: DynamicMetricCard,
    key: "DynamicMetricCard",
  },
];

const buildDynamicDatasets = (dynamicDatasets: DynamicDataset[]) =>
  dynamicDatasets.map((dynamicDataset) => {
    const Component = AVAILABLE_COMPONENTS.find(
      ({ key }) => key === dynamicDataset.data.component
    )?.component;
    return <Component key={dynamicDataset.id} {...dynamicDataset.data} />;
  });

const DynamicDatasetsSection = ({
  project,
  startDateFilter,
  endDateFilter,
  interval,
}: Props) => {
  const { dynamicDatasets, isLoading } = useDynamicDatasetsController(
    project.id!
  );

  if (isLoading || !dynamicDatasets) {
    return <Loading />;
  }

  if (dynamicDatasets?.length === 0) {
    return null;
  }

  return (
    <Box mb={1}>
      <Box mb={1}>
        <Typography variant="h3">Dynamic Metrics</Typography>
      </Box>
      {buildDynamicDatasets(dynamicDatasets!)}
    </Box>
  );
};

export default DynamicDatasetsSection;
