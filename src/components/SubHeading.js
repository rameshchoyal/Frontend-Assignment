// src/components/SubHeading.js

import Image from "next/image";

const SubHeading = () => {
  return (
    <div className="flex items-center justify-between p-4  shadow-sm ">
      <div className="flex items-center">
        <button className="mr-4 text-xl">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
            alt="Back Arrow"
            width={24}
            height={24}
          />
        </button>
        <h1 className="text-3xl font-serif  ">Test 3_staging</h1>
        <button className="text-blue-500 border bg-blue-50 border-blue-500 px-2 ml-8  text-sm rounded-3xl">
          <span className="text-xs font-bold"> Primary Feed</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-green-500 text-white px-4 py-3 rounded-md">
          <span className="text-sm font-bold">Publish Feed</span>
        </button>
      </div>
    </div>
  );
};

export default SubHeading;
