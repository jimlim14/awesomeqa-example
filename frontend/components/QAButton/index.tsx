import { Button, ButtonProps, Typography, useTheme } from "@mui/material";

interface Props extends ButtonProps {
	children?: React.ReactNode;
}

const QAButton: React.FC<Props> = ({ children, style, sx, ...props }) => {
	return (
		<Button
			sx={{
				border: "1px solid #302F36",
				borderRadius: "8px",
				bgcolor: "#1C1C1F",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				p: "14px",
				width: "306px",
				...sx,
			}}
			style={{ ...style }}
			{...props}
		>
			<Typography variant="button">{children}</Typography>
		</Button>
	);
};

export default QAButton;
