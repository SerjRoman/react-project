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
					<div className="cart-item">
						{/* <h1 className="item-title">{cartItem.title}</h1> */}
						<div className="item-card">
							<img className="item-img" src={cartItem.image} />
							<div className="item-text">
								<p>Discription: {cartItem.description}</p>
								<p>Category: {cartItem.category}</p>
								<p>Price: {cartItem.price}$</p>
								<p>Numbers of items:</p>
								<div className="amount-items">
									<button className="btn-plus">+</button>
									<button className="btn-minus">-</button>
								</div>
							</div>
						</div>
						<div className="buttons">
							<button className="item-btn">Buy</button>
                            <Link to={`/product/${cartItem.id}`}>
							<button className="item-btn">
								Go to
							</button>
                            </Link>
							<button
								className="item-btn del"
								onClick={() => {
									removeItem(cartItem.id);
								}}
							>
								Delete
							</button>
						</div>
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
