import { createContext, ReactNode, useContext, useState } from "react"
import { Response } from "../shared/types/response"

// интерфейс юзера
interface IUser {
    id: number
    username: string
    email: string
    role: string
    image: string
}
// обьект для контекста юзера 
interface IUserContext {
    user: IUser | null
    login: (email: string , password: string) => void
    register: (username: string, email:string, password: string, image: string) => void

}


// изначальное значение для контекста
const initialValue: IUserContext = {
    user: null,
    login: (email, password) => {},
    register: (username, email, password, image) => {}
}
// создаем контекст пользователя
const userContext = createContext<IUserContext>(initialValue)
// хук для использования нашего контекста
export function useUserContext(){
    return useContext(userContext);
}
//интерфейс для провайдера
interface IUserContextProvider {
    children : ReactNode

}



// провайдер
export function UserContextProvider(props: IUserContextProvider) {
    //пропсы
    const {children} = props
    //состояние юзера
    const [user , setUser] = useState<IUser | null>(null)
    // // асинхронная функция получения юзера
    async function getUser(token : string){
        // пробуем отправить наш токен
        try{
            // Запрос к API для получения данных юзера
            const response = await fetch("http://localhost:8000/api/user/me",{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        // если всё же не фуфры муфры, то будем выдавать еррор
        } catch{    

        }
    }

// асинхронная функция логина
    async function login(email: string, password : string){
        try{
            const response = await fetch("http://localhost:8000/api/user/login",{
                method: "POST",
                // Указываем, что передаем JSON
                headers: {
                    "Content-Type": "application/json",
                },
                // Переобразует ответ в JSON + тело запроса
                body: JSON.stringify({email : email, password : password})
            })
            const result: Response<string> = await response.json()
            if (result.status == "error"){
                console.log(result.message)
            }else {
                
            }
        } catch{
            
        }
    }

// асинхронная функция регистрации
    async function register(username: string, email:string, password: string, image: string) {
        try {
            const response = await fetch("http://localhost:8000/api/user/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username:username, email:email, password:password, image:image}),
            })
            const result: Response<string> = await response.json()
            
            if (result.status === "error"){
                console.log(result.message)
            }else {
                
            }
            
        }catch{

        }
    }
    return<userContext.Provider value = {{user: user }}>{children}</userContext.Provider>
}