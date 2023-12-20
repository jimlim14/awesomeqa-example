import { Box, Typography, Tooltip, useTheme } from "@mui/material";
import { MessageType, TicketType } from "@/types/types";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import LinkIcon from "@mui/icons-material/Link";
import ticketsPageStyles from "@/styles/Tickets.module.css";
import contextMessageStyles from "./ContextMessage.module.css";
import fetcher from "@/lib/fetcher";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
	ticket: TicketType;
	message: MessageType;
	contextMessages: MessageType[];
};

const ContextMessage: React.FC<Props> = (props) => {
	const theme = useTheme();
	const [content, setContent] = useState<string | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getContent(props.message.content);
				setContent(result);
			} catch (error) {
				console.error(error);
			}
		}

		fetchData();
	}, []);

	function getRepliedMessage(referenceId: string) {
		const repliedMessage = props.contextMessages.find(
			(message) => message.id === referenceId
		);
		if (repliedMessage) {
			return (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<TurnRightIcon
						sx={{ m: "0 25px 0 37px", color: theme.palette.grey[500] }}
					/>
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
						<Typography color={props.message.author.color} variant="body2">
							{repliedMessage.author.name}
						</Typography>
						<Typography noWrap color={theme.palette.grey[300]} variant="body2">
							: {repliedMessage.content}
						</Typography>
					</Box>
				</Box>
			);
		}
	}

	async function getContent(text: string): Promise<string> {
		const tagRegex = /<@(\d+)>/g;
		let replacedMessage = text;
		let match: RegExpExecArray;

		while ((match = tagRegex.exec(text)) !== null) {
			const userId = match[1];
			const { data, error } = await fetcher(`user?user_id=${userId}`);

			if (!error) {
				const username = `@${data.name}`;
				replacedMessage = replacedMessage.replace(match[0], username);
			} else {
				console.error(
					`Failed to fetch user data for userId ${userId}: ${error}`
				);
				replacedMessage = replacedMessage.replace(match[0], `@unknown_user`);
			}
		}

		return replacedMessage;
	}

	return (
		<Box
			sx={{
				bgcolor:
					props.ticket.msg_id === props.message.id
						? "rgba(219, 168, 50, 0.2)"
						: "",
			}}
		>
			{props.message.reference_msg_id &&
				getRepliedMessage(props.message.reference_msg_id)}
			<Box
				sx={{
					display: "flex",
					mb: "20px",
					p: "0 20px",
				}}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={props.message.author.avatar_url}
					alt=""
					width={50}
					height={50}
					style={{ borderRadius: "50%", marginRight: "16px" }}
				/>
				<Box width="100%" sx={{ display: "flex", flexDirection: "column" }}>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<Typography
								color={props.message.author.color}
								sx={{ mr: "8px" }}
								variant="body1"
							>
								{props.message.author.name}
							</Typography>
							<Typography color={theme.palette.grey[500]} variant="body2">
								{props.message.timestamp}
							</Typography>
						</Box>
						{props.ticket.msg_id === props.message.id && (
							<Tooltip title="go to discord" placement="top-start">
								<a href={props.message.msg_url} style={{ border: "none" }}>
									<LinkIcon
										fontSize="small"
										className={ticketsPageStyles.actionIcon}
									/>
								</a>
							</Tooltip>
						)}
					</Box>
					<ReactMarkdown
						className={contextMessageStyles.reactMarkdown}
						linkTarget="_blank"
						components={{
							code({ node, inline, className, children, ...rest }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline && match ? (
									<div style={{ width: "752px" }}>
										<SyntaxHighlighter
											{...rest}
											style={oneDark}
											language={match[1]}
											PreTag="div"
										>
											{children as string}
										</SyntaxHighlighter>
									</div>
								) : (
									<code {...props}>&apos;{children}&apos;</code>
								);
							},
						}}
					>
						{content}
					</ReactMarkdown>
				</Box>
			</Box>
		</Box>
	);
};

export default ContextMessage;
