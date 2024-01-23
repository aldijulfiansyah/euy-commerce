"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "../Utils/Skeleton";
import { debounce } from "lodash";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryError, setErrorCategory] = useState<string | null>(null);
  const [productError, setErrorProduct] = useState<string | null>(null);
  const debouncedFetchData = debounce(fetchData, 300);

  useEffect(() => {
    debouncedFetchData();
  }, [selectedCategory]);

  async function fetchData() {
    try {
      setLoading(true);
      setErrorProduct(null);
      const url = selectedCategory
        ? `${api_url}/products/category/${selectedCategory}`
        : `${api_url}/products`;

      const response = await fetch(url);
      const data = await response.json();

      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      const apiErrorMessage =
        "Apologies for any inconvenience. Please note that we are utilizing a public API, and it's possible that the server is currently undergoing maintenance or experiencing high traffic. Feel free to try again later. Thank you for your understanding. 👨‍🔧";
      setErrorProduct(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setErrorCategory(null);
        const response = await fetch(`${api_url}/products/categories`);
        const data = await response.json();

        setCategories(data);
      } catch (error: any) {
        console.error("Error fetching categories:", error.message);
        setErrorCategory(
          "Im so sorry the Server is under maintenance or overloaded 👨‍🔧"
        );
      }
    };

    fetchCategories();
  }, []);

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
            {
              // categoryError ?(<div className="error-message">{categoryError}</div>) :

              categories.map((category, index) => (
                <button
                  className={`btn join-item capitalize ${
                    selectedCategory === category
                      ? "bg-[#D2D2D2] border-[#D2D2D2]"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))
            }
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-xs lg:text-base mt-10">
        {productError ? (
          <div className=" flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-green-500">
              503
            </p>
            <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
              Server Error
            </p>
            <p className="text-gray-500 mt-8 py-2 border-y-2 text-center">
              {productError}
            </p>
          </div>
        ) : loading ? (
          // Render skeleton loading when loading is true
          Array.from({ length: selectedCategory ? products.length : 6 }).map(
            (_, index) => (
              <div key={`skeleton-${index}`} className="">
                <Skeleton />
              </div>
            )
          )
        ) : (
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
                  loading="lazy"
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title">{product.title}</h2>
                <p className="capitalize">{product.category}</p>
                {/* <p>{product.description}</p> */}
                <p>{product.price}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-success text-white ">
                    Add To Cart 👍
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Landing;
