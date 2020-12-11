import React from "react";
import "./OrderItem.css";

export default ({ item, aditionals }) => {
	return (
		<div className="item-wrapper">
			<h4>{item}</h4>
			<ul>
				{aditionals.map((aditional) => (
					<li key={aditional}>{aditional}</li>
				))}
			</ul>
		</div>
	);
};
