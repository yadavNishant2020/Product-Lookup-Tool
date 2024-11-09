import React, { useRef } from 'react';

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <input
        type="text"
        placeholder="Search for a product"
        defaultValue={searchTerm}
        onChange={handleInputChange}
        className="px-4 py-2 border rounded-md mr-2 text-black"
      />
      <button
        type="submit"
        className="bg-[#3498db] hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;