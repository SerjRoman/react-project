import { ReactNode } from "react"
import { Main } from "../Main/Main"
import { Footer } from '../Footer/Footer'
import { Header } from "../Header/Header"

import "./Layout.css"
import { Outlet } from "react-router-dom"
interface ILayoutProps {
    // children специальное свойство React компонента указывается в props позволяет добавить другие элементы 
    // между открывающим и закрывающим тегом самого компонента 
    children?: ReactNode
}


export function Layout(props:ILayoutProps){
    // const styles = {
    //     backgroundColor: '',
    //     color: "",
        
    // }
    return(
        <div className="Layout">
            <Header></Header>
            <Main><Outlet></Outlet></Main>
            <Footer></Footer>
        {/* <div className="Layout" style={{backgroundColor: "gray"}}> */}
        {/* <div className="Layout" style={styles}> */}
            {props.children}
            
        </div>

    )   
}