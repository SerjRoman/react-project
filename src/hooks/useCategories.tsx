import { useState, useEffect } from "react"

interface ICategory {
    name: string;
    id: number;
    description: string | null;
    img: string;
}

export function useCategories(){
    const [categories, setCategories] = useState<ICategory[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchCategories(){
            try {
                setLoading(true)
                const response = await fetch("https://fakestoreapi.com/products/categories")
                const result = await response.json()

                if (result.status === "ok") {
                    setCategories(result.data)
                } else {
                    setError(result.message)
                }
            } catch(error){
                if (error instanceof Error) {
                    setError(error.message)
                }
                console.log(error)

            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
        
    }, [])
    return {categories: categories, loading: loading, error: error}
}
