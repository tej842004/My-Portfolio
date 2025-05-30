import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Vastago Grotesk', sans-serif`,
    body: `'Vastago Grotesk', sans-serif`,
  },
  styles: {
    global: {
      "@font-face": [
        {
          fontFamily: "Vastago Grotesk",
          src: "url('/fonts/VastagoGrotesk-Regular.woff2') format('woff2')",
          fontWeight: 400,
          fontStyle: "normal",
        },
        {
          fontFamily: "Vastago Grotesk",
          src: "url('/fonts/VastagoGrotesk-Bold.woff2') format('woff2')",
          fontWeight: 700,
          fontStyle: "normal",
        },
      ],
      body: {
        fontFamily: "'Vastago Grotesk', sans-serif",
        fontWeight: 400,
      },
    },
  },
  textStyles: {
    body: {
      fontSize: { base: "14px", sm: "16px", md: "18px", lg: "20px" },
      fontWeight: 400,
    },
    heading: {
      fontSize: { base: "24px", sm: "28px", md: "32px", lg: "36px" },
      fontWeight: 700,
    },
  },
});

export default theme;
