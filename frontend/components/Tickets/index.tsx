import { Box, Grid, Typography } from "@mui/material";
import styles from "../../styles/Tickets.module.css";
import { MessageType, TicketType } from "../../types/types";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";
import Drawer from "@mui/material/Drawer";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import LinkIcon from "@mui/icons-material/Link";
import TicketFooter from "./TicketFooter";

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

	function getRepliedMessage(referenceId: string) {
		const repliedMessage = contextMessages.find(
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
						<Typography color={message.author.color}>
							{repliedMessage.author.name}
						</Typography>
						<Typography noWrap color="#dfdfe2" sx={{ fontSize: "12px" }}>
							: {repliedMessage.content}
						</Typography>
					</Box>
				</Box>
			);
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
					<Box sx={{ width: "500px", p: "20px 0" }}>
						{contextMessages &&
							contextMessages.map((message: MessageType) => (
								<Box
									key={message.id}
									sx={{
										bgcolor:
											props.ticket.msg_id === message.id
												? "rgba(219, 168, 50, 0.2)"
												: "",
									}}
								>
									{message.reference_msg_id &&
										getRepliedMessage(message.reference_msg_id)}
									<Box
										sx={{
											display: "flex",
											mb: "20px",
											p: "0 20px",
										}}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={message.author.avatar_url}
											alt=""
											width={50}
											height={50}
											style={{ borderRadius: "50%", marginRight: "16px" }}
										/>
										<Box
											width="100%"
											sx={{ display: "flex", flexDirection: "column" }}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
												}}
											>
												<Box sx={{ display: "flex" }}>
													<Typography
														color={message.author.color}
														sx={{ mr: "8px" }}
													>
														{message.author.name}
													</Typography>
													<Typography color="#808389" sx={{ fontSize: "12px" }}>
														{message.timestamp}
													</Typography>
												</Box>
												{props.ticket.msg_id === message.id && (
													<a href={message.msg_url} style={{ border: "none" }}>
														<LinkIcon
															fontSize="small"
															className={styles.actionIcon}
														/>
													</a>
												)}
											</Box>
											{message.content}
										</Box>
									</Box>
								</Box>
							))}
					</Box>
				</Drawer>
			</Box>
		</Grid>
	);
};

export default Ticket;
