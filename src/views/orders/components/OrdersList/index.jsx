import React from "react";
import OrderCard from "../OrderCard";

import "./OrdersList.css";

export default ({ orders }) => {
	return (
		<div className="orders-container">
			{orders && orders.length !== 0 ? (
				orders.map((order, index) => <OrderCard key={index} order={order}/>)
			) : (
				<div>
					<h2>No orders yet.</h2>
					<h3>It's quiet... too quiet</h3>
				</div>
			)}
		</div>
	);
};
