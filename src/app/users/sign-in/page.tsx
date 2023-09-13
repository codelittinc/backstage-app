"use client";
import { signIn } from "next-auth/react";
import Box from "@/components/Box";
import Button from "@/components/Button";
import IllustrationLayout from "./IllustrationLayout";

import bgImage from "@/assets/images/illustrations/illustration-reset.jpg";

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
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </IllustrationLayout>
  );
}

export default Illustration;
