import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import ProductCard from './components/ProductCard';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import { Product } from './types';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsPerPage = 6;

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg p-10 text-white">
      <div className='flex items-center gap-1 relative mb-2'>
      <h1 className="text-3xl font-bold mb-8">Product Lookup Tool</h1>
      <p className='text-[#3498db] absolute top-8 right-0'>by nishant.</p>
      </div>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={(e) => e.preventDefault()} />
      {loading && <Loader />}
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={handleProductClick} />
        ))}
      </div>
      <Pagination
        onPageChange={paginate}
        totalCount={products.length}
        currentPage={currentPage}
        pageSize={productsPerPage}
      />
      {selectedProduct && <Modal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;