import { Box, Typography } from "@mui/material";
import styles from "../../styles/Tickets.module.css";
import { MessageType, TicketType } from "../../types/types";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";

type Props = {
	ticket: TicketType;
	handleSearchClick: (msgId: string) => void;
	handleSearchMessageChange: (searchMessage: string) => void;
};

const Ticket: React.FC<Props> = (props) => {
	const [message, setMessage] = useState<MessageType | null>(null);

	useEffect(() => {
		const fetchMessage = async () => {
			const data = await fetcher(`message?msgId=${props.ticket.msg_id}`);
			setMessage(data);
		};

		fetchMessage();
	}, []);

	return (
		<Box className={styles.ticket}>
			{message && (
				<Box sx={{ display: "flex" }}>
					<Typography color={message.author.color}>
						{message.author.name}
					</Typography>
					<Typography>: {message.content}</Typography>
					<button
						onClick={(e) => {
							e.stopPropagation();
							props.handleSearchClick(props.ticket.msg_id);
							props.handleSearchMessageChange(message.content);
						}}
					>
						search
					</button>
				</Box>
			)}
		</Box>
	);
};

export default Ticket;
