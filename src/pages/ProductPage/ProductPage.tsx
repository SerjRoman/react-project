import { useParams } from "react-router-dom"
import { useProductById } from "../../hooks/useProductById"
import "./ProductPage.css"
import { TailSpin } from "react-loader-spinner"
import { useCartContext } from "../../context/cartContext"
import { Modal } from "../../shared/Modal/Modal"
import { useState } from "react"





export function ProductPage() {
    
    const params = useParams()
    const { product, loading, error } = useProductById(Number(params.id))



    const [isModalOpen, setIsModalOpen] = useState(false)

    const {addItem, isInCart} = useCartContext()

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
                <img src={product?.img} alt="Product" className="product-image" />
                <div className="product-info">
                    <h1 className="product-title">{product?.name}</h1>
                    <p className="product-description">{product?.description}</p>
                    {/* <p className="product-price">Price: ${product?.price}</p> */}


                    {/* Треба отримати категорію по categoryId з product */}
                    {/* <p className="product-category">Category: {product?.category}</p> */}

                </div>
            </div>
            <div className="product-buttons">
                <button className="product-button" onClick={() => {
                    //если isInCart вернет false - значит продукта нет в корзине(то что нужно при добавлении)
                    //если isInCart вернет true - значит продукт есть в корзине
                    // если нам надо что бы было false (для условий надо true) мы переделываем (!) false на true 
                    if (product && !isInCart(product.id)) {
                        addItem(product)
                        setIsModalOpen(true)
                        // setTimeout(func, time) - функция js, которая вызывает func через time
                        // func - это функция callback 
                        // time - это ms
                        setTimeout(()=>{
                            setIsModalOpen(false)
                        }, 1000)
                    }
                }}>В корзину</button>
                <button className="product-button">Купить</button>
            </div>
        </div>}
        {isModalOpen === true ?
        <Modal doCloseOutside={false} onClose={() => {setIsModalOpen(false)}} className="notification">
            <span>Продукт был успешно добавлен в корзину!</span>
        </Modal> 
        :
        ""
    }
    </div>
    )
}
