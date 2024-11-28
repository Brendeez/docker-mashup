import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import TwittertList from '../components/TwitterList';
import { useLocation } from 'react-router-dom';
import { fetchConfig } from "../fetchConfig";

const TwitterPage = () => {
  // State variables to manage tweets and loading state
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access the current route's location to get data passed through React Router
  const location = useLocation();
  const receivedData = location.state.itemdata.title;
  console.log("location: ", receivedData);

  // useEffect to fetch data from the backend when the component mounts
  useEffect(() => {
    // Define a fetchData function to make the API request
    const fetchData = async () => {
      // Fetch the backend URL from the fetchConfig function
      const backendURL = await fetchConfig();
      console.log(backendURL);

      // Set loading to true to indicate that data is being fetched
      setLoading(true);

      // Make a GET request to the backend API
      axios
        .get(`${backendURL}/twitter2/${receivedData}`) // change to positive in final
        .then((response) => {
          // Set the tweets state with the response data
          setTweets(response.data);
          console.log(response.data);

          // Set loading back to false when data is received
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);

          // Set loading back to false in case of an error
          setLoading(false);
        });
    };

    // Call the fetchData function to initiate the API request
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-blue-100 h-8 flex items-center justify-center">
        <h1 className="bg-green-500 font-bold py-2 px-4 rounded mb-4">{receivedData}</h1>
      </div>
      {loading ? <Spinner /> : ''}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tweets && tweets.results && tweets.results.length > 0 ? (
          // Map through the tweets and render TwittertList components
          tweets.results.map((tweet) => (
            <TwittertList key={tweet.tweet_id} tweet={tweet} />
          ))
        ) : (
          // Display a message if no tweets are available
          <p>No tweets available.</p>
        )}
      </div>
    </div>
  );
};

export default TwitterPage;
