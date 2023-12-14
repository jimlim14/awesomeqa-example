import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Message, Ticket } from "../../types/types";

function Tickets() {
	const [tickets, setTickets] = useState<Ticket[] | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const totalPages = Math.ceil(tickets?.length / itemsPerPage);
	const currentTickets = tickets.slice(startIndex, endIndex);

	useEffect(() => {
		fetch(`http://localhost:5001/tickets/?start=${0}1&stop=${219}`)
			.then((res) => res.json())
			.then((data) => setTickets(data));
	}, []);

	function handlePageChange(operator: string) {
		if (operator === "-") {
			setCurrentPage((prev) => Math.max(prev - 1, 1));
		}
		if (operator === "+") {
			setCurrentPage((prev) => Math.min(prev + 1, totalPages));
		}
	}

	return (
		<>
			<Box>
				{tickets &&
					currentTickets.map((ticket: Ticket) => (
						<div key={ticket.id}>{ticket.id}</div>
					))}
			</Box>
			<Box>
				<button
					onClick={() => handlePageChange("-")}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span> Page {currentPage} </span>
				<button
					onClick={() => handlePageChange("+")}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</Box>
		</>
	);
}

export default Tickets;
