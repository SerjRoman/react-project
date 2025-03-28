import { Link } from "react-router-dom";
import "./ProductCard.css";

interface IProductCardProps {
	name: string;
	price: number;
	img: string;
	id: number;
}

export function ProductCard(props: IProductCardProps) {
	return (
		<div className="product">
			<Link to={`/product/${props.id}`}>
				<h1 className="name">{props.name.slice(0, 20)}...</h1>
				<div className="product-image">
					<img src={props.img} alt="" />
				</div>
				<h2 className="price">Price: {props.price}</h2>
				<button className="purchase-btn">Купить</button>
			</Link>
		</div>
	);
}
