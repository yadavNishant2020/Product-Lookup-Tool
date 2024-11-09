import React from 'react';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    rating: number;
    thumbnail: string;
    availabilityStatus: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.id} className="bg-black text-white shadow-md rounded-md p-4 w-[30vw] h-[55vh] flex flex-col">
      <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-contain rounded-md mb-4" />
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