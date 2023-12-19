import { Box, Typography, Tooltip, Alert, useTheme } from "@mui/material";
import ticketFooterStyles from "./TicketFooter.module.css";
import ticketsPageStyles from "../../../styles/Tickets.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { formatDateDistance } from "../../../lib/formatDateDistance";
import fetcher from "../../../lib/fetcher";
import { TicketType, MessageType } from "../../../types/types";
import { useState } from "react";

type Props = {
	ticket: TicketType;
	message: MessageType;
	handleSearchClick: (msgId: string) => void;
	handleSearchMessageChange: (searchMessage: string) => void;
	setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
};

const TicketFooter: React.FC<Props> = (props) => {
	const theme = useTheme();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function handleSearch(e: React.MouseEvent<SVGSVGElement>) {
		e.stopPropagation();
		props.handleSearchClick(props.ticket.msg_id);
		props.handleSearchMessageChange(props.message.content);
	}

	async function handleTicketDelete(e: React.MouseEvent<SVGSVGElement>) {
		e.stopPropagation();
		const { data, error } = await fetcher(
			`tickets?ticket_id=${props.ticket.id}`,
			undefined,
			"DELETE"
		);
		if (error) {
			setErrorMessage("failed to delete ticket.");
		}
		if (data) {
			props.setTickets(data);
			setErrorMessage(null);
		}
	}

	return (
		<Box className={ticketsPageStyles.ticketFooter}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Tooltip
					title="click to search this question that might appear in other context"
					placement="top"
				>
					<SearchIcon
						onClick={handleSearch}
						sx={{ mr: "10px" }}
						className={ticketsPageStyles.actionIcon}
					/>
				</Tooltip>
				<MessageIcon sx={{ color: theme.palette.grey[300], mr: "5px" }} />
				<Typography
					color={theme.palette.grey[300]}
					sx={{ mr: "10px" }}
					variant="body1"
				>
					{props.ticket.context_messages.length}
				</Typography>
				<Typography
					className={ticketFooterStyles.timestamp}
					color={theme.palette.grey[500]}
					variant="body2"
				>
					{formatDateDistance(props.message.timestamp)}
				</Typography>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{errorMessage && (
					<Alert
						severity="error"
						sx={{ height: "30px", display: "flex", alignItems: "center" }}
					>
						{errorMessage}
					</Alert>
				)}
				<Tooltip title="delete ticket" placement="top">
					<DeleteOutlineRoundedIcon
						onClick={handleTicketDelete}
						className={ticketsPageStyles.actionIcon}
					/>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default TicketFooter;
