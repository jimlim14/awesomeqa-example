import { Box } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { TicketType } from "../../types/types";
import styles from "../../styles/Tickets.module.css";
import Ticket from "../../components/Ticket";
import fetcher from "../../lib/fetcher";

function Tickets() {
	const [tickets, setTickets] = useState<TicketType[] | null>(null);

	useEffect(() => {
		fetchTickets();
	}, []);

	async function fetchTickets() {
		const data = await fetcher(
			`tickets`
		);
		setTickets(data);
	}

	return (
		<>
			<Box className={styles.ticketsContainer}>
				{tickets &&
					tickets.map((ticket: TicketType) => (
						<Ticket key={ticket.id} ticket={ticket} />
					))}
			</Box>
		</>
	);
}

export default Tickets;
