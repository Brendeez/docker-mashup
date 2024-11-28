import React from 'react';

const TwittertList = ({ tweet }) => {
  console.log("tweet text", tweet.text);
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex items-center">
        <img
          src={tweet.user.profile_pic_url}
          alt={`${tweet.user.username}'s profile`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="text-gray-800 font-semibold">{tweet.user.name}</p>
          <p className="text-gray-500 text-sm">{tweet.user.username}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{tweet.text}</p>
      <div className="mt-2 flex justify-between">
        <p className="text-gray-500">{tweet.creation_date}</p>
        <p className="text-gray-500">{tweet.views} views</p>
      </div>
    </div>
  );
};

export default TwittertList;