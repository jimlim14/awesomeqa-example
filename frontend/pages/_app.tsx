import "@/styles/globals.css";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
	typography: {
		h2: {
			fontFamily: "Inter",
			fontWeight: 500,
			fontSize: "24px",
			lineHeight: "32px",
			letterSpacing: "0px",
		},
		body1: {
			fontFamily: "Inter",
			fontWeight: 500,
			fontSize: "14px",
			lineHeight: "20px",
			letterSpacing: "0.2px",
		},
		body2: {
			fontFamily: "Inter",
			fontWeight: 500,
			fontSize: "12px",
			lineHeight: "16px",
			letterSpacing: "0.2px",
		},
		button: {
			fontFamily: "Roboto",
			fontWeight: 500,
			fontSize: "24px",
			lineHeight: "28px",
			textTransform: "none",
			color: "white",
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
