import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      key={product.id}
      className="bg-black text-white shadow-md rounded-md p-4 w-[60vw] md:w-[30vw] md:h-[50vh] flex flex-col cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-contain rounded-md mb-4 text-center" />
      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
      <p className="text-lg font-medium mb-2">Rating: {product.rating}</p>
      <p className="text-lg font-medium mb-2">
        Availability: {product.availabilityStatus || 'N/A'}
      </p>
    </div>
  );
};

export default ProductCard;