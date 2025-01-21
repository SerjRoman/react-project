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
}
// наше defaultValue
const initialValue: ICartContext = {
    cartItems: [],
	addItem: (item: IProduct) => {}
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
	return (
		<div>
			<cartContext.Provider value={{cartItems: cartItems, addItem:addItem}}>
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
