import React from 'react';
import TB from './TwitterButton';
//  title
//  description
//  Extract

const KeywordList = ({ data }) => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{data.title}</h2>
        <p className=" bg-blue-300 text-gray-700 text-base py-2 px-4 rounded">{data.description}</p>
        <p className="text-gray-700 text-base mt-2">{data.extract}</p>
      </div>
      <div className="px-6 py-4">
        <a
          href={data.content_urls.desktop.page}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read more
        </a>
        <TB itemdata={data}/>
      </div>
      
    </div>
  );
};


export default KeywordList