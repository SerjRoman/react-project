import { useParams } from "react-router-dom";
import { useProductById } from "../../hooks/useProductById"
import { Button } from "../../shared/Button";
import "./ProductPage.css"

export function ProductPage() {
    const params = useParams()
    // NaN почитать
    const { product } = useProductById(Number(params.id))

    return (
        <div className="product-container">
            <div className="product-body">
                <div className="product-img">
                    <img src={product?.image} alt="" width={419} height={474} />
                </div>
                <div className="product-content">
                    <div className="product-text">
                        <h1>{product?.title}</h1>
                        <p>{product?.description}</p>
                    </div>
                    <div className="product-buttons">
                        <div className="buy-btn"><Button>Купить</Button></div>
                        <div className="to-cart-btn"><Button>В корзину</Button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
