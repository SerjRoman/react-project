import { useState, useEffect } from "react"

export interface IProduct {
    id: number
    title: string
    description: string
    image: string
    price: number
    category: string
    // count: number 
}

export function useProducts(){
    // для типизации useState мы после названия хука пишем угловые скибички и в них указываем тип(интерфейс например) и пустой масив
    const [products , setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    useEffect(() => {
        async function fetchProducts() {
            try{
                setLoading(true)
                const response = await fetch("https://fakestoreapi.com/products")
                const productsData = await response.json()
                setProducts(productsData)
            } catch(error){
                console.log(error)
                // const err = error as Error
                if (error instanceof Error){
                    setError(error.message)
                }
            } finally{
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return {products: products, loading: loading, error: error}
}
