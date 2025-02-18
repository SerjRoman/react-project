import { useCartContext } from "../../context/cartContext";


export function CartPage() {
	const { cartItems, removeItem } = useCartContext();

	return (
		<div>
			{cartItems.map((cartItem) => {
				return (
					<div>
						<h1>{cartItem.name}</h1>
						<img src={cartItem.img} />
						<button onClick={() => { removeItem(cartItem.id)}}>delete</button>
					</div>
				);
			})}
		</div>
	);
}
