import { useCartContext } from "../../context/cartContext";


export function CartPage() {
	const { cartItems, removeItem } = useCartContext();

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
