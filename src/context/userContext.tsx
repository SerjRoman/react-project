import { createContext, ReactNode, useContext, useState } from "react"
import { Response } from "../shared/types/response"


interface IUser {
    id: number
    username: string
    email: string
    role: string
    image: string
}

interface IUserContext {
    user: IUser | null
    login: (email: string, password: string) => void
    register: (username: string, email: string, password: string, image: string) => void

}


// дефолтное значение для контекста
const initialValue: IUserContext = {
    user: null,
    login: (email, password) => { },
    register: (username, email, password, image) => { }
}

const userContext = createContext<IUserContext>(initialValue)

// обертка над хуком для получения контекста юзера
export function useUserContext() {
    return useContext(userContext);
}

interface IUserContextProvider {
    children: ReactNode

}



// обертка над провайдером для контекста юзера
export function UserContextProvider(props: IUserContextProvider) {
    const { children } = props
    const [user, setUser] = useState<IUser | null>(null)

    // Функция для получения юзера с api по токену
    async function getUser(token: string) {
        try {
            const response = await fetch("http://localhost:8000/api/user/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch {

        }
    }


    // Функция для авторизации юзера, отправляет запрос на api и в случае успеха - должна сохранять полученный токен
    async function login(email: string, password: string) {
        try {
            const response = await fetch("http://localhost:8000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password })
            })
            const result: Response<string> = await response.json()
            if (result.status == "error") {
                console.log(result.message)
            } else {

            }
        } catch {

        }
    }

    // функция для регистрации, обрабатывает полученный ответ и сохраняет авторизационный токен (по крайней мере должна)
    async function register(username: string, email: string, password: string, image: string) {
        try {
            const response = await fetch("http://localhost:8000/api/user/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, email: email, password: password, image: image }),
            })
            const result: Response<string> = await response.json()

            if (result.status === "error") {
                console.log(result.message)
            } else {

            }

        } catch {

        }
    }
    // возвращаем провайдер связанный с самим контекстом, передавая созданные функции
    return <userContext.Provider value={{ user: user }}>{children}</userContext.Provider>
}
