import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111",
    },
  },
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
