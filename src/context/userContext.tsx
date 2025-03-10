import { createContext, ReactNode, useContext, useState } from "react"
import { Response } from "../shared/types/response"

//интерфейс юзера
interface IUser {
    id: number
    username: string
    email: string
    role: string
    image: string
}
// интерфейс/обьект для контекста юзера 
interface IUserContext {
    user: IUser | null
    login: (email: string , password: string) => void
    register: (username: string, email:string, password: string, image: string) => void

}


// нулевое/изначальное значение для контекста почти то же самое что и сверху только это обьект типизированный интерфейсом выше , вопрос , почему тогда сразу не типизировать просто обьект
const initialValue: IUserContext = {
    user: null,
    login: (email, password) => {},
    register: (username, email, password, image) => {}
}
//ура ура ура наконец создаем контекст пользователя
const userContext = createContext<IUserContext>(initialValue)
// что то типо хука но вроде не он для использования нашего контекста
export function useUserContext(){
    return useContext(userContext);
}
//интерфейс для провайдера
interface IUserContextProvider {
    children : ReactNode

}



//сам провайдер
export function UserContextProvider(props: IUserContextProvider) {
    //пропсы
    const {children} = props
    //состояние юзера
    const [user , setUser] = useState<IUser | null>(null)
    // асинхронная функция получения юзера ибо это дело не быстрое
    async function getUser(token : string){
        //пипитка отправить наш токен
        try{
            // Запрос к API для получения данных пользователя
            const response = await fetch("http://localhost:8000/api/user/me",{
                headers: {
                    "Authorization": `Bearer ${token}`//передаем бериер токен
                }
            })
        } catch{    
            //тута потом ошибки будут
        }
    }

     // асинхронная функция логина потому что это тоже дело не быстрое
    async function login(email: string, password : string){
        //пипитка 
        try{
            // Отправляем запрос на логин
            const response = await fetch("http://localhost:8000/api/user/login",{
                method: "POST",
                // Указываем, что передаем JSON
                headers: {
                    "Content-Type": "application/json",
                },
                // Преобразуем ответ в JSON
                body: JSON.stringify({email : email, password : password})
            })
            const result: Response<string> = await response.json()
            if (result.status == "error"){
                console.log(result.message)
            }else {
                //што то дальше
            }
        } catch{
            //тута ошибки потом
        }
    }
    // Функция для регистрации пользователя
    async function register(username: string, email:string, password: string, image: string) {
        //пипитка отправить запрос на регистр
        try {
            // Запрос к API для регистрации
            const response = await fetch("http://localhost:8000/api/user/registration", {
                method: "POST",
                // Указываем, что передаем JSON
                headers: {
                    "Content-Type": "application/json",
                },
                // Передаем тело запроса
                body: JSON.stringify({username:username, email:email, password:password, image:image}),
            })
            // Преобразуем ответ в JSON
            const result: Response<string> = await response.json()
            //если ашибка
            if (result.status === "error"){
                console.log(result.message)
            }else {
                //ааа логика
            }
            
        }catch{
            //потом ашибки
        }
    }
    //незаконченный провайдер контекста с не до конца переданными дочерними элементами/пропсами
    return<userContext.Provider value = {{user: user }}>{children}</userContext.Provider>
}