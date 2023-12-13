import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import QAButton from "../components/QAButton";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { SxProps } from "@mui/material";

const buttonStyle: SxProps = {
	color: "white",
	bgcolor: "rgba(93,	80,	195, 0.2)",
	height: "38px",
	width: "38px",
	borderRadius: "8px",
	mb: "14px",
};

const IndexPage = () => {
	return (
		<>
			<Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<QAButton startIcon={<SubjectOutlinedIcon sx={buttonStyle} />}>
								Knowledge Base
							</QAButton>
							<QAButton startIcon={<SupportAgentIcon sx={buttonStyle} />} href="/tickets">
								Tickets
							</QAButton>
							<QAButton startIcon={<LightbulbOutlinedIcon sx={buttonStyle} />}>
								FAQ Insights
							</QAButton>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default IndexPage;
