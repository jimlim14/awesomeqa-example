import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		button: {
			fontFamily: "Roboto",
			fontWeight: 500,
			fontSize: "24px",
			lineHeight: "28px",
			textTransform: "none",
      color: "white"
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
