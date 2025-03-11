import { createContext, ReactNode, useContext, useState } from "react";
import { IProduct } from "../hooks/useProducts";

interface ICartItem extends IProduct {
	quantity: number; 
}

// создаем интерфейс который определяет что будет в нашем контексте
// interface типизируют обьекты
interface ICartContext {
	cartItems: ICartItem[];
	addItem: (item: IProduct) => void;
	removeItem: (id: number) => void;
	clearCart: () => void;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
	isInCart: (id: number) => boolean;
}
// наше defaultValue
const initialValue: ICartContext = {
	cartItems: [],
	addItem: (item: IProduct) => {},
	removeItem: (id: number) => {},
	clearCart: () => {},
	increaseQuantity: () => {},
	decreaseQuantity: () => {},
	isInCart: (id: number) => {
		return false;
	},
};

// создаем контекст с помощью функции createContext и передаем наше значение по умолчанию
export const cartContext = createContext<ICartContext>(initialValue);

export function useCartContext(){
	return useContext(cartContext);
}

interface ICartContextProviderProps {
	children: ReactNode;
}

export function CartContextProvider(props: ICartContextProviderProps) {
	const { children } = props;
    //  useState -> [state, setState]
    // [name, setName] = [state, setState]
    // name = 10 - неправильно
    // setName(10) - правильно
    
    // useState -> [state, setState]
    // state - состояние, 10, "", {}, [].
    // setState - функция, которая изменяет состояние
    
	// const [count, setCount] = useState(0) // useState принимает инициальное значени
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);
	// function addItem(item: IProduct) {
	// 	// Створюємо тимчасовий масив, який копіює старий масив (cartItems) та додає новий елемент (item)
	// 	const tempArray = [...cartItems, item];
	// 	// Записуємо у наш стан (cartItems) оновлений масив зі старими елементами + новий елемент :)
	// 	setCartItems(tempArray);
	// }
	function addItem(item: IProduct) {
		setCartItems(prevCart => {
			const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
			if (existingItem) {
				return prevCart.map(cartItem =>
					cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
				);
			} else {
				return [...prevCart, { ...item, quantity: 1 }];
			}
		});
	}

	function removeItem(id: number) {
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
		const tempArray = cartItems.filter((value) => {
			return value.id != id;
		});
		setCartItems(tempArray);
	}

	function clearCart() {
		setCartItems([]); 
	}

	function increaseQuantity(id: number) {
		setCartItems(prevCart =>
			prevCart.map(cartItem =>
				cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
			)
		);
	}

	function decreaseQuantity(id: number) {
		setCartItems(prevCart =>
			prevCart.map(cartItem =>
				cartItem.id === id
					? { ...cartItem, quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1 }
					: cartItem
			)
		);
	}

	function isInCart(id: number) {
		// ищем продукт в массиве корзины по id. приводим значение найденного эллемента в логическое значение
		return Boolean(cartItems.find((item) => item.id === id));
		// return Boolean( cartItems.find((item) => {reutrn item.id === id}))
	}
	const Provider = cartContext.Provider;
	return (
		<Provider
			value={{
				cartItems: cartItems,
				addItem: addItem,
				removeItem: removeItem,
				clearCart: clearCart,
				increaseQuantity,
                decreaseQuantity,
				isInCart,
			}}
		>
			{children}
		</Provider>
	);
}
