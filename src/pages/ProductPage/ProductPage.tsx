import { useParams } from "react-router-dom"
import { useProductById } from "../../hooks/useProductById"
import "./ProductPage.css"
import { TailSpin } from "react-loader-spinner"
import { cartContext } from "../../shared/App"
import { useContext } from "react"

export function ProductPage() {
    const params = useParams()
    const { product, loading, error } = useProductById(Number(params.id))
    
    const {addItem} = useContext(cartContext)

    return (
        <div>
        {loading === true ? 
            <div className="product-loader">
                <TailSpin
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        /></div> : 
            error !== "" ? <div>
                {error} 
            </div> :
            <div className="product-container">
            <div className="product-content">
                <img src={product?.image} alt="Product" className="product-image" />
                <div className="product-info">
                    <h1 className="product-title">{product?.title}</h1>
                    <p className="product-description">{product?.description}</p>
                    <p className="product-price">Price: ${product?.price}</p>
                    <p className="product-category">Category: {product?.category}</p>
                </div>
            </div>
            <div className="product-buttons">
                <button className="product-button" onClick={() => {
                    if (product) {
                        addItem(product)
                    }
                }}>В корзину</button>
                <button className="product-button">Купить</button>
            </div>
        </div>}
    </div>
    )
}
