import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setProducts(result.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="150"
                height="150"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteProduct(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
