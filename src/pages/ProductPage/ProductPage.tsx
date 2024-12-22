import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"
import "./ProductPage.css"

export function ProductPage (){
    const params = useParams()
    // NaN почитать
    const {product} = useProductById(Number(params.id))

    return (
        <div className="ProductPage-div">
            <span className="ProductPage-span">
                <div className="ProductPage-image-div">
                    <img className="ProductPage-image" src={product?.image} alt="img" />
                </div>
                <div className="Productpage-content">
                    <h1>Product: {product?.title}</h1>
                    <p>Description:{product?.description}</p>
                    <p>Price: {product?.price}</p>
                    <p>Category: {product?.category}</p>
                    <span className="span1">
                        <button className="button-card">В корзину</button>
                        <button className="button-buy">Купить</button>
                    </span>
                </div>
                
            </span>
            {/* <h6>{params.id}</h6>    */}
        </div>
    )
}