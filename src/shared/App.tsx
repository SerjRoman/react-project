import { Layout } from "./Layout/Layout";
import { Main } from "./Main/Main";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ProductListPage } from "../pages/ProductListPage/ProductListPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { MainPage } from "../pages/MainPage/MainPage";
import { createContext } from "react";
import { IProduct } from "../hooks/useProducts";

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
	cartItems : IProduct[]
}
// наше defaultValue
const initialValue: ICartContext = {
    cartItems: []
}
// создаем контекст с помощью функции createContext и передаем наше значение по умолчанию
export const cartContext = createContext<ICartContext>(initialValue)

export function AppComponent() {
	// const [count, setCount] = useState(0) // useState принимает инициальное значени
	return (
		<div>
			<cartContext.Provider value={{cartItems: []}}>
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
						</Route>
					</Routes>
				</BrowserRouter>
			</cartContext.Provider>
		</div>
	);
}
