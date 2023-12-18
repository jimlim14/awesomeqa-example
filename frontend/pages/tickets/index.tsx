import { Grid } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { TicketType } from "../../types/types";
import styles from "../../styles/Tickets.module.css";
import Ticket from "../../components/Tickets";
import fetcher from "../../lib/fetcher";

function Tickets() {
	const [tickets, setTickets] = useState<TicketType[] | null>(null);
	const [searchMsgId, setSearchMsgId] = useState("");
	const [isSearchSelected, setIsSearchSelected] = useState<boolean>(false);
	const [searchMessage, setSearchMessage] = useState("");

	useEffect(() => {
		fetchTickets();
	}, []);

	async function fetchTickets() {
		const data = await fetcher(`tickets`);
		setTickets(data);
	}

	return (
		<>
			{isSearchSelected && (
				<>
					<button
						onClick={() => {
							setIsSearchSelected(false);
							setSearchMessage("");
						}}
					>
						cancel search
					</button>
					<p>search question: {searchMessage}</p>
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
