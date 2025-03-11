import { Link } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import "./CartPage.css"


export function CartPage() {
	const { cartItems, removeItem, clearCart, increaseQuantity, decreaseQuantity } = useCartContext();

	return (
		<div className="cart-page">
			<div className="header-cart">
				<h1>Cart</h1>
			</div>
			<div className="content-cart">
				{cartItems.map((cartItem) => {
					return (
						<div>
							<div className="cart-product">
								<div className="image-div">
									<img className="image-product" src={cartItem.image} />
								</div>
								<div className="text-product-div">
									<h2 className="text-product">{cartItem.title}</h2>
									<p className="text-product">Description: {cartItem.description}</p>
									<p className="text-product">Category: {cartItem.category}</p>
									<p className="text-product">Price: {cartItem.price}</p>
									<p className="text-product"> Number of items: {cartItem.quantity} </p>
									<div className="quantity-buttons">
										<button className="button plus" onClick={() => increaseQuantity(cartItem.id)}>+</button>
										<button className="button minus" onClick={() => decreaseQuantity(cartItem.id)}>-</button>
									</div>
								</div>
								<div className="cart-buttons">
									<button className="cart-button" onClick={() => { }}>Buy</button>
									<Link to={`/product/${cartItem.id}`}><button className="cart-button" >Go To</button></Link>
									<button className="cart-button" onClick={() => { removeItem(cartItem.id)}}>Delete</button>
								</div>
							</div>
							<hr />
						</div>
					);
				})}
			</div>
			<div className="footer-cart">
				<h1>Total Price: {cartItems.reduce((acc, item) => acc + item.price, 0)}</h1>
				
				<button className="cart-button" onClick={() => { }}>Buy All</button>
				<button className="cart-button" onClick={clearCart}>Delete All</button>

			</div>
		</div>
	);
}
