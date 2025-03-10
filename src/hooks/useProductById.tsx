import { useState, useEffect } from "react"
import { IProduct } from "./useProducts"

export function useProductById(id: number | undefined){

    const [product , setProduct] = useState<IProduct>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    useEffect(() => {
        if(!id){
            return
        }
        async function fetchProduct() {
            try {
                setLoading(true)
                const response = await fetch(`http://localhost:8000/api/product/${id}`)
                const result = await response.json()

                if (result.status === "ok") {
                    setProduct(result.data)
                } else {
                    setError(result.message)
                }
            } catch (error) {
                console.log(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
            
        }
        fetchProduct()

    }, [id])
    return {product: product, loading: loading, error: error}
}