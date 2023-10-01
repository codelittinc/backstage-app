import { CircularProgress, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";

const quotes = [
  "I can do this all day.",
  "I am Iron Man.",
  "Avengers, assemble!",
  "I have an army.",
  "I'm always angry.",
  "I understood that reference.",
  "We have a Hulk.",
  "I see a suit of armor around the world.",
  "I'm not afraid to hit an old man.",
  "I can do anything you can do, better.",
];

const emojis = ["🦸‍♂️", "🦸‍♀️", "🦹‍♂️", "🦹‍♀️", "🕷️", "🕸️", "🦹‍♂️", "🦹‍♀️", "🦸‍♂️", "🦸‍♀️"];

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  zIndex: 9999,
});

export default function Loading() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const quote = quotes[quoteIndex];
  const emoji = emojis[quoteIndex];

  return (
    <StyledBox>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <CircularProgress />
        <Box mt={1} display="flex" justifyContent="space-between">
          <Box>{quote}</Box>
          <Box>{emoji}</Box>
        </Box>
      </Box>
    </StyledBox>
  );
}
