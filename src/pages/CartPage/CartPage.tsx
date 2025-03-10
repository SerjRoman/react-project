import { useEffect, useState } from "react";
import { useCartContext } from "../../context/cartContext";
import "./CartPage.css";
import { Link } from "react-router-dom";

export function CartPage() {
	const {cartItems, removeItem, clearCart} = useCartContext();
    const [sumPrice, setSumPrice] = useState<number>(0)


    useEffect(()=>{
        const totalPrice = cartItems.reduce((sum,currentPrice) => sum + currentPrice.price, 0)
        setSumPrice(totalPrice)  
    },[cartItems])

	return (
		<div className="cart-box">
			{cartItems.map((cartItem) => {
				return (
					<div>
						<h1>{cartItem.name}</h1>
						<img src={cartItem.img} />
						<button onClick={() => { removeItem(cartItem.id)}}>delete</button>
					</div>
				);
			})}
			<div className="summary">
				<h1>Total Price: {sumPrice}$</h1>
				<div className="summary-btns">
					<button className="cart-btn">Buy All</button>
					<button
						className="cart-btn del"
						onClick={() => {
							clearCart();
						}}
					>
						Delete All
					</button>
				</div>
			</div>
		</div>
	);
}
