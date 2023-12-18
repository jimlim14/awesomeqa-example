import { Box, Skeleton, Grid, Typography } from "@mui/material";
import styles from "../../styles/Tickets.module.css";
import { MessageType, TicketType } from "../../types/types";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";
import Drawer from "@mui/material/Drawer";
import TicketFooter from "./TicketFooter";
import ContextMessage from "./ContextMessage";

type Props = {
	ticket: TicketType;
	handleSearchClick: (msgId: string) => void;
	handleSearchMessageChange: (searchMessage: string) => void;
	setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
};

const Ticket: React.FC<Props> = (props) => {
	const [message, setMessage] = useState<MessageType | null>(null);
	const [toggleDrawer, setToggleDrawer] = useState(false);
	const [contextMessages, setContextMessages] = useState<MessageType[] | null>(
		null
	);

	useEffect(() => {
		const fetchMessage = async () => {
			const data = await fetcher(`message?msgId=${props.ticket.msg_id}`);
			setMessage(data);
		};

		fetchMessage();
	}, []);

	async function handleDrawerOpen(e: React.KeyboardEvent | React.MouseEvent) {
		if (!toggleDrawer) {
			setToggleDrawer(true);

			const data = await fetcher(`messages?ticketId=${props.ticket.id}`);
			setContextMessages(data);
		} else {
			setToggleDrawer(false);
		}
	}

	return (
		<Grid item md={6} xs={12}>
			<Box
				height="100%"
				onClick={handleDrawerOpen}
				className={styles.ticketContainer}
				sx={{ bgcolor: toggleDrawer ? "#0A0A0A" : "#1c1c1f" }}
			>
				{message && (
					<>
						<Box sx={{ display: "flex" }}>
							<Typography color={message.author.color}>
								{message.author.name}
							</Typography>
							<Typography>: {message.content}</Typography>
						</Box>
						<TicketFooter
							ticket={props.ticket}
							message={message}
							setTickets={props.setTickets}
							handleSearchClick={props.handleSearchClick}
							handleSearchMessageChange={props.handleSearchMessageChange}
						/>
					</>
				)}
				<Drawer
					anchor="right"
					open={toggleDrawer}
					onClose={() => setToggleDrawer(false)}
					hideBackdrop
				>
					<Box className={styles.drawerContainer}>
						{contextMessages
							? contextMessages.map((message: MessageType) => (
									<ContextMessage
										key={message.id}
										ticket={props.ticket}
										message={message}
										contextMessages={contextMessages}
									/>
							  ))
							: [...Array(10)].map((_, i) => (
									<Skeleton
										variant="rectangular"
										key={i}
										height={60}
										sx={{ mb: "16px" }}
									/>
							  ))}
					</Box>
				</Drawer>
			</Box>
		</Grid>
	);
};

export default Ticket;
