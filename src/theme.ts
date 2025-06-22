import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Sora', 'Vastago Grotesk', sans-serif",
    body: "'Sora', 'Vastago Grotesk', sans-serif",
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
      "html, body": {
        backgroundColor: "#000000",
        color: "white",
        fontFamily: "'Sora', 'Vastago Grotesk', sans-serif",
        lineHeight: "base",
      },
    },
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#000000",
    },
  },
});

export default theme;
