import { useState, useEffect } from "react";

import "./ProductsList.css";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "./ProductCard/ProductCard";
import { TailSpin } from "react-loader-spinner";
import { useCategories } from "../../hooks/useCategories";
import { capitalizeFirstLetter } from "../../tools/capitalizeFirstLetter";

// https://fakestoreapi.com/products/categories

export function ProductsList() {
	//    {products, loading }   = {products: [], loading: boolean}
	const { products, loading, error } = useProducts();
	const [selectedCategory, setSelectedCategory] = useState<string>("All");
	const [filteredProducts, setFilteredProducts] = useState(products); // []

	useEffect(() => {
		console.log(selectedCategory);
		if (selectedCategory === "All") {
			setFilteredProducts(products);
		} else {
			const filtered = products.filter((product) => {
				return product.Category.name === selectedCategory;
			});
			setFilteredProducts(filtered);
		}
	}, [selectedCategory, products]);
	// {categories: categories, loading: loading, error: error}
	const {
		categories,
		loading: categoriesLoading,
		error: categoriesError,
	} = useCategories();
	// condition ? result if true : result else
	// name == "Nikita" ? <div>Nikita tuta</div> : <div>Ne Nikita</div
	// age >= 18 ? <div>You r over 18</div> : <div> You r not over 18</div>

	return (
		<div className="products">
			<div className="selectDiv">
				{/* мап - это метод массивов, который перебирает каждый элемент 
                    и для него выплняет колбэк функцию. 
                    (Метод возвращает новый массив элементов для jsx кода)*/}

				{categoriesLoading ? (
					<TailSpin
						visible={true}
						height="80"
						width="80"
						color="#4fa94d"
						ariaLabel="tail-spin-loading"
						radius="1"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				) : categoriesError ? (
					<h1>{categoriesError}</h1>
				) : (
					<select
						className="selectMenu"
						onChange={(event) => {
							const selectedValue = event.target.value;
							setSelectedCategory(selectedValue);
						}}
					>
						<option value="All">All</option>
						{categories.map((category) => {
							// electronics -> E + lectronics
							return (
								<option value={category.name}>
									{capitalizeFirstLetter(category.name)}
								</option>
							);
						})}
					</select>
				)}
			</div>

			{loading === true ? (
				<div className="loader">
					<TailSpin
						visible={true}
						height="80"
						width="80"
						color="#4fa94d"
						ariaLabel="tail-spin-loading"
						radius="1"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			) : error !== "" ? (
				<div>{error}</div>
			) : (
				<div className="productsDiv">
					{/* 
                [
                    {name: '', price: 1} ,
                    {name: '', price: 1} ,
                    {name: '', price: 1},
                    {name: '', price: 1},
                    {name: '', price: 1}
                ] */}
					{filteredProducts.map((product) => {
						// key - специальный ключ (id), который используеться при отображении массивов
						// этот ключ позваляет определить, какой элемент был удален добавлен и т. п.
						return (
							// {product.price}
							<ProductCard
								name={product.name}
								img={product.img}
								price={0}
								key={product.id}
								id={product.id}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
