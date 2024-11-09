import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import ProductCard from './components/ProductCard';
import Loader from './components/Loader';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  availabilityStatus: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
          if (response.data.products.length > 0) {
            setProducts(response.data.products);
          } else {
            setError('Product not found');
          }
        } catch (err) {
          setError('Error fetching product data');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg p-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Product Lookup Tool</h1>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={(e) => e.preventDefault()} />

      {loading && <Loader />}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;