import { useState } from 'react';
import axios from 'axios';

interface Product {
  title: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async (e:any) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${searchTerm}`);
        if (response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product data');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Product Lookup Tool</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <input
            type="text"
            placeholder="Search for a product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
  
        {loading && <div className="mb-4">Loading...</div>}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {product && (
          <div className="bg-white shadow-md rounded-md p-4 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
            <p className="text-lg font-medium mb-2">Rating: {product.rating.rate}</p>
            <p className="text-lg font-medium mb-2">
              Availability: {product.rating.count > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        )}
      </div>
    );
  };
  

export default App
