import React, { useEffect, useState } from "react";
import database from "../../config/db";
import "./Orders.css";
import OrdersList from "./components/OrdersList";

export default (props) => {
	const [orders, setOrders] = useState(null);

	const subscribeOrders = () => {
		const ordersRef = database.ref("/orders");
		const parseResponseToArray = (response) => {
			return Object.keys(response).map((key) => ({
				id: key,
				...response[key],
			}));
		};
		ordersRef.on("value", (snap) => {
			const parsedResponse = parseResponseToArray(snap.val());
			setOrders(parsedResponse.filter(o => o.status !== "DONE"));
		});
	};

	useEffect(() => {
		subscribeOrders();
	}, []);

	return (
		<>
			<div className="title-wrapper">
				<h1 className="title">
					<span>Pending</span> Orders
				</h1>
			</div>
			<OrdersList orders={orders} />
		</>
	);
};
