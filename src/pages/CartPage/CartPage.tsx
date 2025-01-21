import { useContext } from "react";
import { cartContext } from "../../shared/App";

export function CartPage() {
	const { cartItems } = useContext(cartContext);
	return (
		<div>
			{cartItems.map((cartItem) => {
				return (
					<div>
						<h1>{cartItem.title}</h1>
						<img src={cartItem.image} />
					</div>
				);
			})}
		</div>
	);
}
