import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.get("http://localhost:4001/products");
      setProducts(result.data.data);
    } catch (error) {
      setError("Error fetching products. Please try again.");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      const newProducts = products.filter((product) => product.id !== id);
      setProducts(newProducts);
    } catch (error) {
      setError("Error deleting product. Please try again.");
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
      </div>
      <div className="product-list">
        {!loading &&
          !error &&
          products.map((product) => (
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
