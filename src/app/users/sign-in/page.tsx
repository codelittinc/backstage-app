"use client";
import { signIn } from "next-auth/react";

import bgImage from "@/assets/images/illustrations/illustration-reset.jpg";
import Box from "@/components/Box";
import Button from "@/components/Button";
import routes from "@/routes";

import IllustrationLayout from "./IllustrationLayout";


function Illustration(): JSX.Element {
  return (
    <IllustrationLayout
      title="Welcome to Codelitt Backstage!"
      description="Sign in with your Codelitt account to continue."
      illustration={bgImage.src}
    >
      <Box component="form" role="form">
        <Box mt={4} mb={1}>
          <Button
            variant="gradient"
            color="info"
            size="large"
            fullWidth
            onClick={() =>
              signIn("google", { callbackUrl: routes.userSettingsPath })
            }
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </IllustrationLayout>
  );
}

export default Illustration;
