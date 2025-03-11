import { createContext, ReactNode, useContext, useState } from "react"
import { Response } from "../shared/types/response"


interface IUser {
    id: number
    username: string
    email: string
    role: string
    image: string
}
// інтерфейс для контексту, то що буде в контексті
interface IUserContext {
    user: IUser | null
    login: (email: string , password: string) => void
    register: (username: string, email:string, password: string, image: string) => void

}


// значення, яке буде стояти для контексту за замовчуванням
const initialValue: IUserContext = {
    user: null,
    login: (email, password) => {},
    register: (username, email, password, image) => {}
}
// створюємо контектс
const userContext = createContext<IUserContext>(initialValue)
//  функція, щоб не дьоргати контекст в інші файли на пряму (так не бажано робить, бо так сказав Сергій і я йому вірю)
export function useUserContext(){
    return useContext(userContext);
}
// інтерфейс для провайдера, він потрібен, бо компонент контекста з провайдером ми будемо викликати в app наприклад, а там може бути контекст в контексті, шляхи ітп.
interface IUserContextProvider {
    children : ReactNode

}



// компонент провайдера
export function UserContextProvider(props: IUserContextProvider) {
    const {children} = props
    const [user , setUser] = useState<IUser | null>(null)
    // функція для отримання юзеру з бекенду 
    async function getUser(token : string){
        try{
            const response = await fetch("http://localhost:8000/api/user/me",{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch{    

        }
    }

    // функція для логіну, тобто відправки запиту на бекєнд, який перевірить чи є цей користувай в бд
    async function login(email: string, password : string){
        try{
            const response = await fetch("http://localhost:8000/api/user/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

    // функція для реєстрації, тобто відправки запиту на бекєнд, який перевірить чи є цей користувай в бд, якщо немає, то додасть його
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
    // повертаємо контекст
    return<userContext.Provider value = {{user: user }}>{children}</userContext.Provider>
}