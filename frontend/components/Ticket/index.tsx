import { Box, Typography } from "@mui/material";
import styles from "../../styles/Tickets.module.css";
import { MessageType, TicketType } from "../../types/types";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";
import Drawer from "@mui/material/Drawer";
import TurnRightIcon from "@mui/icons-material/TurnRight";

type Props = {
	ticket: TicketType;
	handleSearchClick: (msgId: string) => void;
	handleSearchMessageChange: (searchMessage: string) => void;
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
					<Box sx={{ display: "flex", alignItems: "center" }}>
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
		<Box className={styles.ticket} onClick={handleDrawerOpen}>
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
			<Drawer
				anchor="right"
				open={toggleDrawer}
				onClose={() => setToggleDrawer(false)}
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
	);
};

export default Ticket;
