import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import PageLayout from "@/components/PageLayout";
import { useMaterialUIController } from "@/theme";

interface Props {
  header?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  illustration?: string;
}

function IllustrationLayout({
  header,
  title,
  description,
  illustration,
  children,
}: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <PageLayout background="white">
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main,
        }}
      >
        <Grid item xs={12} lg={6}>
          <Box
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${illustration})` }}
          />
        </Grid>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
          >
            <Box py={3} px={3} textAlign="center">
              {!header ? (
                <>
                  <Box mb={1} textAlign="center">
                    <Typography variant="h4" fontWeight="bold">
                      {title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text">
                    {description}
                  </Typography>
                </>
              ) : (
                header
              )}
            </Box>
            <Box p={3}>{children}</Box>
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default IllustrationLayout;
