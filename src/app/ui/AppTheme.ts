import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "75em",
  xl: "85em",
  "2xl": "100em"
};

const AppTheme = extendTheme({
  config,
  colors: {
    brand: {
      main: "#3138dc",
      primary: "#0068ff",
      secondary: "#0086ff",
      hover: "#00aec1",
      warning: "#ffbd48",
      danger: "#FC8181",
      valid: "#00c17c",
      footer: "#0097a7",
      footerText: "black",
      content: "#2d3748"
    }
  },
  styles: {
    global: {
      body: {
        bg: "#314a9e"
      }
    }
  },
  breakpoints
});

export default AppTheme;
