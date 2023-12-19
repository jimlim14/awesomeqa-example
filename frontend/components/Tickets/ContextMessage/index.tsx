import { Box, Typography, Tooltip } from "@mui/material";
import { MessageType, TicketType } from "../../../types/types";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import LinkIcon from "@mui/icons-material/Link";
import ticketsPageStyles from "../../../styles/Tickets.module.css";
import contextMessageStyles from "./ContextMessage.module.css";

type Props = {
	ticket: TicketType;
	message: MessageType;
	contextMessages: MessageType[];
};

const ContextMessage: React.FC<Props> = (props) => {
	function getRepliedMessage(referenceId: string) {
		const repliedMessage = props.contextMessages.find(
			(message) => message.id === referenceId
		);
		if (repliedMessage) {
			return (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<TurnRightIcon sx={{ m: "0 25px 0 37px", color: "#808389" }} />
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={repliedMessage.author.avatar_url}
							alt=""
							width={20}
							height={20}
							style={{ borderRadius: "50%", marginRight: "6px" }}
						/>
						<Typography color={props.message.author.color} variant="body2">
							{repliedMessage.author.name}
						</Typography>
						<Typography noWrap color="#dfdfe2" variant="body2">
							: {repliedMessage.content}
						</Typography>
					</Box>
				</Box>
			);
		}
	}

	return (
		<Box
			sx={{
				bgcolor:
					props.ticket.msg_id === props.message.id
						? "rgba(219, 168, 50, 0.2)"
						: "",
			}}
		>
			{props.message.reference_msg_id &&
				getRepliedMessage(props.message.reference_msg_id)}
			<Box
				sx={{
					display: "flex",
					mb: "20px",
					p: "0 20px",
				}}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={props.message.author.avatar_url}
					alt=""
					width={50}
					height={50}
					style={{ borderRadius: "50%", marginRight: "16px" }}
				/>
				<Box width="100%" sx={{ display: "flex", flexDirection: "column" }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography color={props.message.author.color} sx={{ mr: "8px" }} variant="body1">
								{props.message.author.name}
							</Typography>
							<Typography color="#808389" variant="body2">
								{props.message.timestamp}
							</Typography>
						</Box>
						{props.ticket.msg_id === props.message.id && (
							<Tooltip title="go to discord" placement="top-start">
								<a href={props.message.msg_url} style={{ border: "none" }}>
									<LinkIcon
										fontSize="small"
										className={ticketsPageStyles.actionIcon}
									/>
								</a>
							</Tooltip>
						)}
					</Box>
					<Typography variant="body1">{props.message.content}</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default ContextMessage;
