import { Box, Grid, Typography } from "@mui/material";
import styles from "../../styles/Tickets.module.css";
import { MessageType, TicketType } from "../../types/types";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";
import Drawer from "@mui/material/Drawer";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { formatDateDistance } from "../../lib/formatDateDistance";

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
					<TurnRightIcon sx={{ m: "0 25px 0 17px", color: "#808389" }} />
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
						<Typography noWrap color="#dfdfe2" sx={{ fontSize: "12px" }}>
							{repliedMessage.content}
						</Typography>
					</Box>
				</Box>
			);
		}
	}

	return (
		<Grid item md={6}>
			<Box
				height="100%"
				onClick={handleDrawerOpen}
				className={styles.ticket}
				sx={{
					bgcolor: toggleDrawer ? "#0A0A0A" : "#1c1c1f",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				{message && (
					<>
						<Box sx={{ display: "flex" }}>
							<Typography color={message.author.color}>
								{message.author.name}
							</Typography>
							<Typography>: {message.content}</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-end",
								mt: "16px",
							}}
						>
							<Box sx={{ display: "flex", alignItems: "center" }}>
								<SearchIcon
									onClick={(e) => {
										e.stopPropagation();
										props.handleSearchClick(props.ticket.msg_id);
										props.handleSearchMessageChange(message.content);
									}}
									sx={{
										borderRadius: "8px",
										cursor: "pointer",
										mr: "10px",
										"&:hover": {
											border: "0.5px solid #808389",
										},
									}}
								/>
								<MessageIcon sx={{ color: "#dfdfe2", mr: "5px" }} />
								<Typography color="#dfdfe2" sx={{ mr: "10px" }}>
									{props.ticket.context_messages.length}
								</Typography>
								<Typography
									sx={{
										border: "1px solid grey",
										borderRadius: "10px",
										padding: "4px 8px",
										fontSize: "12px",
									}}
									color="#808389"
								>
									{formatDateDistance(message.timestamp)}
								</Typography>
							</Box>
							<DeleteOutlineRoundedIcon
								onClick={async (e) => {
									e.stopPropagation();
									const data = await fetcher(
										`tickets?ticket_id=${props.ticket.id}`,
										undefined,
										"DELETE"
									);
									props.setTickets(data);
								}}
								sx={{
									borderRadius: "8px",
									"&:hover": {
										border: "0.5px solid #808389",
									},
								}}
							/>
						</Box>
					</>
				)}
				<Drawer
					anchor="right"
					open={toggleDrawer}
					onClose={() => setToggleDrawer(false)}
					hideBackdrop
				>
					<Box sx={{ width: "550px", p: "20px" }}>
						{contextMessages &&
							contextMessages.map((message: MessageType) => (
								<>
									{message.reference_msg_id &&
										getRepliedMessage(message.reference_msg_id)}
									<Box key={message.id} sx={{ display: "flex", mb: "20px" }}>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={message.author.avatar_url}
											alt=""
											width={50}
											height={50}
											style={{ borderRadius: "50%", marginRight: "16px" }}
										/>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<Box sx={{ display: "flex", alignItems: "center" }}>
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
											{message.content}
										</Box>
									</Box>
								</>
							))}
						{/* <a href={message.msg_url}>Go to discord</a> */}
					</Box>
				</Drawer>
			</Box>
		</Grid>
	);
};

export default Ticket;
