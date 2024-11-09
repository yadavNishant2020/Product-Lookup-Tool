import React from 'react';
import { Product } from '../types';

interface ModalProps {
  product: Product | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white relative text-black p-6 rounded-md w-11/12 md:w-1/2 lg:w-1/3 h-[95%] overflow-x-auto">
        <button className="absolute top-4 right-4 text-black text-3xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-contain rounded-md mb-4" />
        <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
        <p className="mb-2"><strong>Rating:</strong> {product.rating}</p>
        <p className="mb-2"><strong>Availability:</strong> {product.availabilityStatus || 'N/A'}</p>
        <p className="mb-2"><strong>Description:</strong> {product.description}</p>
        <p className="mb-2"><strong>Category:</strong> {product.category}</p>
        <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
        <p className="mb-2"><strong>SKU:</strong> {product.sku}</p>
        <p className="mb-2"><strong>Stock:</strong> {product.stock}</p>
        <p className="mb-2"><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth}</p>
        <p className="mb-2"><strong>Weight:</strong> {product.weight} kg</p>
        <p className="mb-2"><strong>Warranty:</strong> {product.warrantyInformation}</p>
        <p className="mb-2"><strong>Shipping:</strong> {product.shippingInformation}</p>
        <p className="mb-2"><strong>Return Policy:</strong> {product.returnPolicy}</p>
      </div>
    </div>
  );
};

export default Modal;