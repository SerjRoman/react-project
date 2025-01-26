import { useContext } from "react";
import { cartContext } from "../../shared/App";


export function CartPage() {
	const { cartItems, removeItem } = useContext(cartContext);
	return (
		<div>
			{cartItems.map((cartItem) => {
				return (
					<div>
						<h1>{cartItem.title}</h1>
						<img src={cartItem.image} />
						<button onClick={() => { removeItem(cartItem.id)}}>delete</button>
					</div>
				);
			})}
		</div>
	);
}
