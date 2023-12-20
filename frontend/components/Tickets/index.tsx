import {
	Box,
	Skeleton,
	Grid,
	Typography,
	Alert,
	AlertTitle,
} from "@mui/material";
import styles from "@/styles/Tickets.module.css";
import { MessageType, TicketType } from "@/types/types";
import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";
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
	const [ticketErrorMessage, setTicketErrorMessage] = useState<string | null>(
		null
	);
	const [contextMessageError, setContextMessageError] = useState<string | null>(
		null
	);

	useEffect(() => {
		fetchMessage();
	}, []);

	async function handleDrawerOpen(e: React.KeyboardEvent | React.MouseEvent) {
		if (!toggleDrawer) {
			setToggleDrawer(true);
			fetchConversation();
		} else {
			setToggleDrawer(false);
		}
	}

	const fetchMessage = async () => {
		const { data, error } = await fetcher(
			`message?msg_id=${props.ticket.msg_id}`
		);
		if (error) {
			setTicketErrorMessage(`${error}, click to try again`);
		}
		if (data) {
			setMessage(data);
			setTicketErrorMessage(null);
		}
	};

	const fetchConversation = async () => {
		const { data, error } = await fetcher(
			`messages?ticket_id=${props.ticket.id}`
		);
		if (error) {
			setContextMessageError("failed to get conversation");
		}
		if (data) {
			setContextMessages(data);
			setContextMessageError(null);
		}
	};

	return (
		<Grid item md={6} xs={12}>
			<Box
				height="100%"
				onClick={ticketErrorMessage ? fetchMessage : handleDrawerOpen}
				className={styles.ticketContainer}
				sx={{ bgcolor: toggleDrawer ? "#0A0A0A" : "#1c1c1f" }}
			>
				{ticketErrorMessage ? (
					<Alert severity="error">{ticketErrorMessage}</Alert>
				) : (
					message && (
						<>
							<Box sx={{ display: "flex" }}>
								<Typography color={message.author.color} variant="body1">
									{message.author.name}
								</Typography>
								<Typography variant="body1">: {message.content}</Typography>
							</Box>
							<TicketFooter
								ticket={props.ticket}
								message={message}
								setTickets={props.setTickets}
								handleSearchClick={props.handleSearchClick}
								handleSearchMessageChange={props.handleSearchMessageChange}
							/>
						</>
					)
				)}
				<Drawer
					anchor="right"
					open={toggleDrawer}
					onClose={() => setToggleDrawer(false)}
					hideBackdrop
				>
					<Box className={styles.drawerContainer}>
						{contextMessageError ? (
							<Alert severity="error">
								<AlertTitle>Error</AlertTitle>
								{contextMessageError},{" "}
								<strong>
									<u onClick={() => fetchConversation()}>click me</u> to try
									again.
								</strong>
							</Alert>
						) : contextMessages ? (
							contextMessages.map((message: MessageType) => (
								<ContextMessage
									key={message.id}
									ticket={props.ticket}
									message={message}
									contextMessages={contextMessages}
								/>
							))
						) : (
							[...Array(10)].map((_, i) => (
								<Skeleton
									variant="rectangular"
									key={i}
									height={60}
									sx={{ mb: "16px" }}
								/>
							))
						)}
					</Box>
				</Drawer>
			</Box>
		</Grid>
	);
};

export default Ticket;
