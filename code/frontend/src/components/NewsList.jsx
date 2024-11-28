import React from 'react';
import KB from './KeywordsButton';
function NewsItem({ item }) {
  console.log("item val: ",item);
  return (
    <div className="bg-blue-100 border border-black border-opacity-50 p-4 mb-4">
      <h2 className="text-xl font-bold">{item.title}</h2>
      {item.author && <p className="text-gray-600">Author: {item.author}</p>}
      {item.publishedAt && (
        <p className="text-gray-600">
          Published At: {new Date(item.publishedAt).toLocaleString()}
        </p>
      )}
      {item.description && <p>{item.description}</p>}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Read More
        </a>
      )}
      <div className="flex">
      
      <KB itemdata={item}/>
      </div>
     
    </div>
  );
}

function NewsList({ newsData }) {
  return (
    <div>
      {newsData.map((item, index) => (
        <NewsItem key={index} item={item} />
      ))}
    </div>
  );
}

export default NewsList;