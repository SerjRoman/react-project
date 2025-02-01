import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../shared/Layout/Layout";
import { ProductListPage } from "../pages/ProductListPage/ProductListPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";
import { MainPage } from "../pages/MainPage/MainPage";
import { CartPage } from "../pages/CartPage/CartPage";

// Компонент-обертка для всіх шляхів (routes) нашого додатку 

// (╹ڡ╹ ) (✪ ω ✪) ♪(´▽｀)

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/products" element={<ProductListPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/" element={<MainPage />} />
					<Route path="/cart" element={<CartPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
