import React from "react";
import { useState } from "react";
import axios from "axios";
function Search() {
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const companyList = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const categoryList = ["Phone", "Computer", "TV", "Earphone", "Tablet"];
  const [data, setdata] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?limit=5"
      );
      setdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-sans font-thin text-xl">
      <h1>Filters:</h1>
      <div className="p-5 border flex justify-start items-center">
        <h2>Company:</h2>
        <ul className="flex gap-3 p-5">
          {companyList.map((item) => (
            <button
              key={item}
              onClick={() => setCompany(item)}
              className="border rounded-sm transition-all duration-400 hover:bg-gray-300 px-3 hover:font-normal hover:text-white"
            >
              <p>{item}</p>
            </button>
          ))}
        </ul>
      </div>
      <div className="p-5 border flex justify-start items-center">
        <h2>Category:</h2>
        <ul className="flex gap-3 p-5">
          {categoryList.map((item) => (
            <button
              key={item}
              className="border rounded-sm transition-all duration-400 hover:bg-gray-300 px-3 hover:font-normal hover:text-white"
              onClick={() => setCategory(item)}
            >
              <p>{item}</p>
            </button>
          ))}
        </ul>
      </div>
      <div className="p-5 border flex justify-start items-center gap-x-5">
        <h2>Price:</h2>
        <div>
          <label>Min:</label>
          <input type="number" className="border" />
        </div>
        <div>
          <label>Max:</label>
          <input type="number" className="border" />
        </div>
      </div>
      <div className="p-5 border flex justify-start items-center gap-x-5">
        <h2>Sort:</h2>
        <div className="">
          <button className="mx-3 border rounded-sm transition-all duration-400 hover:bg-gray-300 px-3 hover:font-normal hover:text-white">
            Ascending
          </button>
          <button className="mx-3 border rounded-sm transition-all duration-400 hover:bg-gray-300 px-3 hover:font-normal hover:text-white">
            Descending
          </button>
        </div>
      </div>
      <div className="flex justify-center p-5">
        <button className="text-blue-500 border-blue-500 border-2 hover:bg-blue-500 hover:text-white px-3 py-1 text-3xl font-bold rounded-md transition-all duration-400 hover:translate-x-1 hover:-translate-y-1 hover:shadow-gray-400 shadow">
          Search
        </button>
      </div>
      
    </div>
  );
}

export default Search;
