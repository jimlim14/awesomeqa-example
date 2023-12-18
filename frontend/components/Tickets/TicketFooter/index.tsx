import { Box, Typography } from "@mui/material";
import ticketFooterStyles from "./TicketFooter.module.css";
import ticketsPageStyles from "../../../styles/Tickets.module.css";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { formatDateDistance } from "../../../lib/formatDateDistance";
import fetcher from "../../../lib/fetcher";
import { TicketType, MessageType } from "../../../types/types";

type Props = {
	ticket: TicketType;
	message: MessageType;
	handleSearchClick: (msgId: string) => void;
	handleSearchMessageChange: (searchMessage: string) => void;
	setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
};

const TicketFooter: React.FC<Props> = (props) => {
  
	function handleSearch(e: React.MouseEvent<SVGSVGElement>) {
		e.stopPropagation();
		props.handleSearchClick(props.ticket.msg_id);
		props.handleSearchMessageChange(props.message.content);
	}

	async function handleTicketDelete(e: React.MouseEvent<SVGSVGElement>) {
		e.stopPropagation();
		const data = await fetcher(
			`tickets?ticket_id=${props.ticket.id}`,
			undefined,
			"DELETE"
		);
		props.setTickets(data);
	}

	return (
		<Box className={ticketsPageStyles.ticketFooter}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<SearchIcon
					onClick={handleSearch}
					sx={{ mr: "10px" }}
					className={ticketsPageStyles.actionIcon}
				/>
				<MessageIcon sx={{ color: "#dfdfe2", mr: "5px" }} />
				<Typography color="#dfdfe2" sx={{ mr: "10px" }}>
					{props.ticket.context_messages.length}
				</Typography>
				<Typography className={ticketFooterStyles.timestamp} color="#808389">
					{formatDateDistance(props.message.timestamp)}
				</Typography>
			</Box>
			<DeleteOutlineRoundedIcon
				onClick={handleTicketDelete}
				className={ticketsPageStyles.actionIcon}
			/>
		</Box>
	);
};

export default TicketFooter;
