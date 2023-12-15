import { Box, Typography } from "@mui/material";
import styles from "../../styles/Tickets.module.css";
import { MessageType, TicketType } from "../../types/types";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";

type Props = {
	ticket: TicketType;
};

const Ticket: React.FC<Props> = (props) => {
	const [message, setMessage] = useState<MessageType | null>(null);

	useEffect(() => {
		const fetchTicket = async () => {
			const data = await fetcher(`message?msgId=${props.ticket.msg_id}`);
			setMessage(data);
		};

		fetchTicket();
	}, []);

	return (
		<Box className={styles.ticket}>
			{message && (
				<Box sx={{ display: "flex" }}>
					<Typography color={message.author.color}>
						{message.author.name}
					</Typography>
					<Typography>: {message.content}</Typography>
				</Box>
			)}
		</Box>
	);
};

export default Ticket;
