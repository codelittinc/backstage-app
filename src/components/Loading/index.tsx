import { Box, BoxProps, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

const quotes = [
  "☕ Brewing...",
  "🧊 Cold brew loading...",
  "🍵 Steeping info...",
  "⏳ Coffee's almost ready...",
  "☕ Latte art loading...",
  "🔥 Roasting your page...",
  "☕ Drip... drip... loading...",
  "🥤 Blending content...",
  "☕ Espresso-ing data...",
  "🚀 Energizing your page...",
];

interface Props {
  height?: string;
  partial?: boolean;
}

export default function Loading({ partial, height }: Props) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const quote = quotes[quoteIndex];

  const computedStyles: BoxProps["sx"] = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: partial ? height ?? "100%" : "100vh",
    width: partial ? "100%" : "100vw",
    position: partial ? undefined : "fixed",
    top: partial ? undefined : 0,
    left: partial ? undefined : 0,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 9999,
  };

  return (
    <Box sx={computedStyles}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <CircularProgress />
        <Box mt={1} display="flex" justifyContent="space-between">
          <Box>{quote}</Box>
        </Box>
      </Box>
    </Box>
  );
}
