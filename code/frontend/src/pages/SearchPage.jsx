import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsList from '../components/NewsList';
import BB from '../components/BackButton';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { fetchConfig } from "../fetchConfig";

const SearchPage = () => {
  // State variables to manage articles and loading state
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

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
        .get(`${backendURL}/positive`) // change to positive in the final version
        .then((response) => {
          // Set the articles state with the response data
          setArticles(response.data);
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
      <div>
        <BB />
        <div className="bg-blue-100 h-8 flex items-center justify-center">
          <h1 className="bg-green-500 font-bold py-2 px-4 rounded mb-4">POSITIVE NEWS SECTION</h1>
        </div>
      </div>
      {loading ? <Spinner /> : ''}
      {articles.length > 0 ? (
        // Render the NewsList component and pass in the newsData prop
        <NewsList newsData={articles} />
      ) : (
        // Display a message if no articles are available
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default SearchPage;
