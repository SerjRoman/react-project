import { Layout } from "./Layout/Layout";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ╚(•⌂•)╝╚(•⌂•)╝╚(•⌂•)╝
import { ProductListPage } from "../pages/ProductListPage/ProductListPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { MainPage } from "../pages/MainPage/MainPage";
import { createContext, useState } from "react";
import { IProduct } from "../hooks/useProducts";
import { CartPage } from "../pages/CartPage/CartPage";

//  useState -> [state, setState]
// [name, setName] = [state, setState]
// name = 10 - неправильно
// setName(10) - правильно

// useState -> [state, setState]
// state - состояние, 10, "", {}, [].
// setState - функция, которая изменяет состояние

// создаем интерфейс который определяет что будет в нашем контексте
// interface типизируют обьекты
interface ICartContext{
	cartItems : IProduct[],
	addItem: (item: IProduct) => void
	removeItem: (id: number) => void
	isInCart: (id: number) => boolean
}
// наше defaultValue
const initialValue: ICartContext = {
    cartItems: [],
	addItem: (item: IProduct) => {},
	removeItem: (id: number) => {},
	isInCart: (id: number) => {return false}
}
// создаем контекст с помощью функции createContext и передаем наше значение по умолчанию
export const cartContext = createContext<ICartContext>(initialValue)

export function AppComponent() {
	// const [count, setCount] = useState(0) // useState принимает инициальное значени
	const [cartItems, setCartItems] = useState<IProduct[]>([])
	function addItem(item: IProduct){
		// Створюємо тимчасовий масив, який копіює старий масив (cartItems) та додає новий елемент (item)
		const tempArray = [
			...cartItems,
            item
		]
		// Записуємо у наш стан (cartItems) оновлений масив зі старими елементами + новий елемент :)
		setCartItems(tempArray)
	}

	function removeItem(id: number){
        // [1,2,3,4,5].filter( (value) => { return true/false } )
        // true - значит элемент остается в массиве
        // false - значит элемент удаляется из массива
        // id - 3
        // [ {id: 1}, {id: 2}, {id: 3}, {id: 4} ].filter( (value) => {return value.id != id})
        // {id: 1} -> 1 != 3 -> true
        // {id: 2} -> 2 != 3 -> true
        // {id: 3} -> 3 != 3 -> false
        // {id: 4} -> 4 != 3 -> true
        // filter() -> [{id: 1}, {id: 2}, {id: 4}]
		const tempArray = cartItems.filter((value) => {return value.id != id})
		setCartItems(tempArray)
		
	}

    function isInCart(id:number){
		// ищем продукт в массиве корзины по id. приводим значение найденного эллемента в логическое значение
		return Boolean( cartItems.find(item => item.id === id))
		// return Boolean( cartItems.find((item) => {reutrn item.id === id}))
	}
	return (
		<div>
			<cartContext.Provider value={{cartItems: cartItems, addItem:addItem, removeItem: removeItem , isInCart}}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout></Layout>}>
							<Route
								path="/products"
								element={<ProductListPage></ProductListPage>}
							></Route>
							<Route
								path="/product/:id"
								element={<ProductPage></ProductPage>}
							></Route>

							<Route path="/" element={<MainPage></MainPage>}></Route>
							<Route path="/cart" element={<CartPage></CartPage>}></Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</cartContext.Provider>
		</div>
	);
}
