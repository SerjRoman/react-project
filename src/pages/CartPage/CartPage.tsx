import React, { useState, useEffect } from "react"
import { useCartContext } from "../../context/cartContext"
import "./CartPage.css"

interface CartItem {
    id: number
    title: string
    description: string
    category: string
    price: number
    image: string
}

export function CartPage() {
    const { cartItems, removeItem } = useCartContext()
    const [localCart, setLocalCart] = useState<{ [key: number]: number }>({})
    const [displayedItems, setDisplayedItems] = useState<CartItem[]>([])

  useEffect(() => {
    const initialCart: { [key: number]: number } = {}
    cartItems.forEach((item) => {
    initialCart[item.id] = 1
    })
    setLocalCart(initialCart)
    setDisplayedItems(cartItems)
  }, [cartItems])

  
const handleIncrement = (id: number) => {
    setLocalCart((prevCart) => ({
      ...prevCart,
        [id]: prevCart[id] + 1,
    })) 
} 


const handleDecrement = (id: number) => {
    setLocalCart((prevCart) => ({
    ...prevCart,
    [id]: Math.max(1, prevCart[id] - 1),
    }))
}


const calculateTotalPrice = () => {
    return displayedItems.reduce((total, item) => {
        return total + item.price * (localCart[item.id] || 1)
    }, 0)
}


const handleRemoveItem = (id: number) => {
    setDisplayedItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  
const handleDeleteAll = () => {
	setDisplayedItems([])
	setLocalCart({})
  }

  return (
    <div>
      {displayedItems.map((cartItem) => (
        <div className="CartMain" key={cartItem.id}>
            <div className="CartItemDiv">
            <img className="cartImage" src={cartItem.image} alt={cartItem.title} />
            <div className="textItem">
                <p>{cartItem.title}</p>
                <p>{cartItem.description}</p>
                <p>Category: {cartItem.category}</p>
                <p>Price: {cartItem.price}$</p>
                <div className="quantityButtons">
                <button className="incriment" onClick={() => handleIncrement(cartItem.id)}>+</button>
                <span>{localCart[cartItem.id] || 1}</span>
                <button className="decriment" onClick={() => handleDecrement(cartItem.id)}>-</button>
                </div>
            </div>

            <div className="buttonsItem">
                <button className="normal">Buy</button>
                <button className="normal">Go To</button>
                <button className="normalD" onClick={() => handleRemoveItem(cartItem.id)}>Delete</button>
            </div>
            </div>
        </div>
      ))}

      <></>

	  {displayedItems.length > 0 && (
        <div className="totalFoot">
        <p>Total Price: {calculateTotalPrice()}$</p>
            <button className="normal22" onClick={handleDeleteAll}>Delete All</button>
        <button className="normal2" >Buy All</button>
        </div>
        )}
    </div>
  ) 
}


// я честно пытался но там тип добавление через одно место работает


// import { useCartContext } from "../../context/cartContext"
// import { IProduct } from "../../hooks/useProducts"
// import "./CartPage.css"

// export function CartPage() {
//   const { cartItems, addItem, removeItem } = useCartContext()

//   function calculateTotalPrice(): number {
//     return cartItems.reduce((total, item) => total + item.price, 0)
//   }

//   function handleIncrement(item: IProduct): void {
//     addItem(item)
//   }

//   function handleDecrement(id: number): void {
//     removeItem(id)
//   }
//   return (
//     <div className="cart-box">
//       {cartItems.map((cartItem) => (
//         <div className="cart-item" key={cartItem.id}>
//           <div className="item-card">
//             <img className="item-img" src={cartItem.image} alt={cartItem.title} />
//             <div className="item-text">
//               <p>Discription: {cartItem.description}</p>
//               <p>Category: {cartItem.category}</p>
//               <p>Price: {cartItem.price}$</p>
//               <p>Numbers of items:</p>
//               <div className="amount-items">
//                 <button className="btn-plus" onClick={() => handleIncrement(cartItem)}>+</button>
//                 <button className="btn-minus" onClick={() => handleDecrement(cartItem.id)}>-</button>
//               </div>
//             </div>
//           </div>
//           <div className="buttons">
//             <button className="item-btn">Buy</button>
//             <button className="item-btn">Go to</button>
//             <button className="item-btn del" onClick={() => removeItem(cartItem.id)}>Delete</button>
//           </div>
//         </div>
//       ))}

//       <div className="summary">
//         <h1>Total Price: {calculateTotalPrice()}$</h1>
//         <div className="summary-btns">
//           <button className="cart-btn">Buy All</button>
//         </div>
//       </div>
//     </div>
//   )
// }
