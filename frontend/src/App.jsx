import "./App.css";
import { useState } from "react";
function App() {
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");
  const companyList = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
  const categoryList = ["Electronics", "Clothing", "Books", "Home", "Garden"];
  return (
    <div>
      <h1>Filters:</h1>
      <div className="p-5 border flex justify-start items-center">
        <h2>Company:</h2>
        <ul className="flex gap-3 p-5">
          {companyList.map((item) => (
            <button key={item} onClick={() => setCompany(item)}>
              <p>{item}</p>
            </button>
          ))}
        </ul>
      </div>
      <div className="p-5 border flex justify-start items-center">
        <h2>Category:</h2>
        <ul className="flex gap-3 p-5">
          {categoryList.map((item) => (
            <button key={item} onClick={() => setCategory(item)}>
              <p>{item}</p>
            </button>
          ))}
        </ul>
      </div>
      <div className="p-5 border flex justify-start items-center gap-x-5">
        <h2>Price:</h2>
        <div>
          <label>Min:</label>
          <input type="number" className="border"/>
        </div>
        <div>
          <label>Max:</label>
          <input type="number" className="border"/>
        </div>
      </div>
    </div>
  );
}

export default App;
