import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { Response } from "../shared/types/response";

interface IUser {
	id: number;
	username: string;
	email: string;
	role: string;
	image: string;
}

interface IUserContext {
	user: IUser | null;
	login: (email: string, password: string) => Promise<string | void>;
	register: (
		username: string,
		email: string,
		password: string,
		image: string
	) => Promise<string | void>;
}

const initialValue: IUserContext = {
	user: null,
	login: async (email, password) => {},
	register: async (username, email, password, image) => {},
};

const userContext = createContext<IUserContext>(initialValue);

export function useUserContext() {
	return useContext(userContext);
}

interface IUserContextProvider {
	children: ReactNode;
}

export function UserContextProvider(props: IUserContextProvider) {
	const { children } = props;
	const [user, setUser] = useState<IUser | null>(null);

	async function getUser(token: string) {
		try {
			const response = await fetch("http://localhost:8000/api/user/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const result: Response<IUser> = await response.json();
			if (result.status == "error") {
				console.log(result.message);
				return result.message
			} else {
				setUser(result.data);
			}
		} catch {

		}
	}

	async function login(email: string, password: string): Promise<string | void> {
		try {
			const response = await fetch(
				"http://localhost:8000/api/user/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email: email, password: password }),
				}
			);
			const result: Response<string> = await response.json();
			if (result.status == "error") {
				console.log(result.message);
				return result.message
			}
			else {
				getUser(result.data);
			}
        }
		 catch {
			return "Unexpected error"
		 }
	}
	async function register(
		username: string,
		email: string,
		password: string,
		image: string
	): Promise<void | string>{
		try {
			const response = await fetch(
				"http://localhost:8000/api/user/registration",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: username,
						email: email,
						password: password,
						image: image,
					}),
				}
			);
			const result: Response<string> = await response.json();

			if (result.status === "error") {
				console.log(result.message);
				return result.message
			} else {
				localStorage.setItem("token", result.data);
				getUser(result.data);
			}
		} catch {
			return "Unexpected error"
		}
	}
	useEffect(() => {
		const userToken = localStorage.getItem("token");
		if (!userToken) {
			return;
		}
		getUser(userToken);
	}, []);
	return (
		<userContext.Provider
			value={{ user: user, login: login, register: register }}
		>
			{children}
		</userContext.Provider>
	);
}
