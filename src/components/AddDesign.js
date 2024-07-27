import { useState } from "react";
import { designsData } from "../data/VariantData";
import Image from "next/image";

const AddDesign = ({ onClose, onSelectDesign }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDesigns = designsData.filter((design) =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 bg-white rounded shadow-md w-1/2">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl">Select a design to link</h1>
        <button onClick={onClose} className="text-red-500 hover:text-red-700">
          Close
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-5 border border-gray-300 rounded"
      />
      <div className="flex flex-wrap -m-2">
        {filteredDesigns.map((design) => (
          <div key={design.id} className="w-1/4 p-2">
            <div
              className="relative group cursor-pointer"
              onClick={() => onSelectDesign(design)}
            >
              <Image
                src={design.img}
                alt={design.title}
                layout="responsive"
                width={200} // You need to specify a width
                height={200} // You need to specify a height
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                Insert Design
              </div>
            </div>
            <p className="mt-2 text-center">{design.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDesign;
