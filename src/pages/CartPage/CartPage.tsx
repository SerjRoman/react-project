import { removeAllListeners } from "process";
import { useCartContext } from "../../context/cartContext";
import "./CartPage.css" 
import { useState, useEffect } from "react";

export function CartPage() {
	const { cartItems, removeItem, removeAllItems } = useCartContext();
	// не рабочий счетчик 
	const [plusNum, setPlusNum] = useState(1)
	const [allPrice, setAllPrice] = useState([0])
	// useEffect(() => {
	// 	allPrice.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0)
	// }, [allPrice])

	return (
		<div className="allCart">
			<h2 className="h2_1">Cart</h2>
			<div className="allProducts">
				{cartItems.map((cartItem) => {
					// setAllPrice(allPrice + cartItem.price)
					return (
							<div className="oneProduct">
								<img src={cartItem.image} className="productImg"/>
								<div className="productInfo">
									<h1 className="h1_1">{cartItem.title.slice(0, 50)}...</h1> 
									<p className="description">Description: {cartItem.description.slice(0, 255)}...</p> 
									<p className="category">Category: {cartItem.category}</p>
									<p className="cartPrice">Price: {cartItem.price}</p>
									<p>Number of products: {plusNum}</p>
									<div className="plusAndMinus">
										<button className="plusBt pm" onClick={() => {setPlusNum(plusNum+1)}}>+</button>
										<button className="minusBt pm" onClick={() => {setPlusNum(plusNum-1); if (plusNum == 1 || plusNum <= 0) {removeItem(cartItem.id)} }}>–</button>
									</div>
								</div>
								<div className="buttonsList">
									<button className="buttons" onClick={() => { removeItem(cartItem.id)}}>Buy</button>
									<button className="buttons" onClick={() => { removeItem(cartItem.id)}}>Go to</button>
									<button className="buttons deleteButton1" onClick={() => { removeItem(cartItem.id)}}>Delete</button>
								</div>
							</div> 
					);
				})}
			</div> 
			<div className="footerCartContainer">
				<div className="footerCart">
					<p className="totalPrice">Total price:  {allPrice}</p>
					<div className="buttonsPrice">
						<button className="buttons btP">Go to</button>
						<button className="buttons btP deleteButton1" onClick={() => { removeAllItems()}}>Delete all</button>
					</div>
				</div>
			</div>
			
		</div>
	);
}
