"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Utils/Skeleton";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const Landing = () => {
  const api_url = "https://fakestoreapi.com";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesRes = await fetch(`${api_url}/products/categories`);
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        if (selectedCategory) {
          const productsByCategory = await fetch(
            `${api_url}/products/category/${selectedCategory}`
          );
          const productsData: ProductProps[] = await productsByCategory.json();
          setProducts(productsData);
        } else {
          const allProductsRes = await fetch(`${api_url}/products`);
          const allProductsData = await allProductsRes.json();
          setProducts(allProductsData);
        }

        
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <div className="flex justify-center">
        <div
          className="mt-2 flex flex-col  w-[700px]  h-auto  shadow-lg rounded-lg px-10 py-10 "
          style={{
            backgroundImage:
              "url('https://www.the-future-of-commerce.com/wp-content/uploads/2019/12/green_e-commerce-1200x370.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className=" text-center font-medium lg:font-semibold ml-2 mb-2 text-white">
            Select Categories
          </p>
          <div className="join lg:justify-center  w-[400px] lg:w-full overflow-x-auto">
            <button
              className={`btn join-item ${
                selectedCategory === null ? "bg-[#D2D2D2] border-[#D2D2D2]" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                className={`btn join-item capitalize ${selectedCategory === category ? "bg-[#D2D2D2] border-[#D2D2D2]" : "" }`}
                key={index}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-xs lg:text-base mt-10">
      {loading
          ? // Render skeleton loading when loading is true
            Array.from({ length: selectedCategory ? products.length : 6  }).map((_, index) => (
              <div key={`skeleton-${index}`} className="">
                <Skeleton />
              </div>
            )) :
            
        products.map((product, index) => (
          <div
            key={index}
            className="card w-auto h-auto lg:h-auto lg:w-96 shadow-xl"
          >
            <figure className="h-[280px] ">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={80}
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title">{product.title}</h2>
              <p className="capitalize">{product.category}</p>
              {/* <p>{product.description}</p> */}
              <p>{product.price}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-success ">Add To Cart</button>
              </div>
            </div>
          </div>
        ))}

        
      </div>
    </>
  );
};

export default Landing;
