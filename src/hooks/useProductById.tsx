import { useState, useEffect } from "react"
import { IProduct } from "./useProducts"
//；月木月 ，竹十十十十
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
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                const productData = await response.json()
                setProduct(productData)
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