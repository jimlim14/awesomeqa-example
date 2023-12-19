import {
	Grid,
	Box,
	Typography,
	Tooltip,
	Alert,
	AlertTitle,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { TicketType } from "../../types/types";
import styles from "../../styles/Tickets.module.css";
import Ticket from "../../components/Tickets";
import fetcher from "../../lib/fetcher";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Tickets() {
	const [tickets, setTickets] = useState<TicketType[] | null>(null);
	const [searchMsgId, setSearchMsgId] = useState("");
	const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
	const [searchMessage, setSearchMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		fetchTickets();
	}, []);

	async function fetchTickets() {
		const { data, error } = await fetcher(`tickets`);
		if (error) {
			setErrorMessage("failed to fetch tickets");
			return;
		}
		if (data) {
			setTickets(data);
			setErrorMessage(null);
		}
	}

	if (errorMessage) {
		return (
			<Alert severity="error">
				<AlertTitle>Error</AlertTitle>
				{errorMessage} - <strong>refresh the page to try again</strong>
			</Alert>
		);
	}

	return (
		<>
			{isSearchSelected && (
				<>
					<Tooltip title="clear search" placement="top">
						<RestartAltIcon
							fontSize="large"
							onClick={() => {
								setIsSearchSelected(false);
								setSearchMessage("");
							}}
							style={{ margin: "16px 0", cursor: "pointer" }}
						/>
					</Tooltip>
					<Box sx={{ display: "flex", alignItems: "center", mb: "16px" }}>
						<Typography>Search question: </Typography>
						<Typography className={styles.searchQuestion} width="fit-content">
							{searchMessage}
						</Typography>
					</Box>
				</>
			)}
			<Grid container spacing={2}>
				{tickets &&
					tickets.map((ticket: TicketType) => {
						if (
							!isSearchSelected ||
							ticket.context_messages.includes(searchMsgId)
						) {
							return (
								<Ticket
									key={ticket.id}
									ticket={ticket}
									setTickets={setTickets}
									handleSearchMessageChange={(searchMessage: string) =>
										setSearchMessage(searchMessage)
									}
									handleSearchClick={(msgId: string) => {
										setSearchMsgId(msgId);
										setIsSearchSelected(true);
									}}
								/>
							);
						}
					})}
			</Grid>
		</>
	);
}

export default Tickets;
