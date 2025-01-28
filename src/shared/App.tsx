
// ╚(•⌂•)╝ ╚(•⌂•)╝ ╚(•⌂•)╝
import { CartContextProvider } from "../context/cartContext";
import { AppRoutes } from "../routes/Routes";


export function AppComponent() {
	return (
		<>
			<CartContextProvider>
				<AppRoutes/>
			</CartContextProvider>
		</>
	);
}
