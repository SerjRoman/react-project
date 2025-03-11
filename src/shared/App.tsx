// ╚(•⌂•)╝ ╚(•⌂•)╝ ╚(•⌂•)╝
import { CartContextProvider } from "../context/cartContext";
import { UserContextProvider } from "../context/userContext";
import { AppRoutes } from "../routes/Routes";

export function AppComponent() {
    return (
        <>
            <UserContextProvider>
                <CartContextProvider>
                    <AppRoutes />
                </CartContextProvider>
            </UserContextProvider>
        </>
    );
}
