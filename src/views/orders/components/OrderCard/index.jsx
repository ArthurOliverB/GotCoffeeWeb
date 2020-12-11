import React, { useEffect, useState } from "react";
import db from "../../../../config/db";
import OrderItem from "../OrderItem";
import { FiCoffee, FiCheckCircle } from "react-icons/fi";
import "./OrderCard.css";

export default ({ order }) => {
	const [item, setItem] = useState(null);

	const getOrderNewState = (currentStatus) => {
		switch (currentStatus) {
			case "PENDING":
				return "DOING";
			case "DOING":
				return "DONE";
			default:
				return "PENDING";
		}
	};

	const updateOrderReference = (newOrderState) => {
		const orderRef = db.ref(`orders/${order.id}`);
		orderRef.set(newOrderState);
	};

	const handleClick = () => {
		const newStatus = getOrderNewState(order.status);
		updateOrderReference({ customer: order.customer, status: newStatus });
	};

	const fetchOrderDetails = async (id) => {
		const itemsRef = db.ref(`/items/${id}`);
		const snapshot = await itemsRef.once("value");
		const value = snapshot.val();
		setItem(value);
	};

	useEffect(() => {
		fetchOrderDetails(order.id);
	}, [order, order.id]);

	return (
		<>
			<div className="card-wrapper">
				<div className="card-container">
					<div className="order-title-wrapper">
						<h2>{order.customer}</h2>
					</div>
					<div className="items-container">
						{item &&
							item.map((i, index) => {
								return (
									<OrderItem
										key={index}
										item={i.item}
										aditionals={i.aditionals}
									/>
								);
							})}
						<div className="action-wrapper">
							<button onClick={(e) => handleClick()}>
								{order && order.status === "PENDING" ? (
									<FiCoffee />
								) : (
									<FiCheckCircle />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
