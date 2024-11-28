import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { fetchConfig } from "../fetchConfig";
import SB from '../components/SearchButton';
import NB from '../components/NegativeButton';
const Home = () => {
  const [counter, setCounter] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const backendURL = await fetchConfig();
      console.log(backendURL);

      // Now we have the backendURL, we can make fetch requests to it
      // fetch(`${backendURL}/endpoint`)...
      setLoading(true);
      axios
        .get(`${backendURL}/`)
        .then((response) => {
          setCounter(response.data);
          setLoading(false);
          console.log("counter: ", counter.number);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    fetchData();


  }, []);

  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <div className="h-64 w-64 bg-rose-200 hover:bg-teal-500 hover:bg-opacity-50 border-4 border-red-500 rounded-full flex flex-col items-center justify-center">
          <div className="bg-blue-100 h-8 flex items-center justify-center">
            <h1 className="bg-orange-300 font-bold py-2 px-4 rounded mb-4">TOP NEWS OF THE DAY</h1>
          </div>
          {loading ? <Spinner /> : ''}
          <div className="mb-4">Counter Num of Visits: {counter.number !== undefined && counter.number !== null ? counter.number : 0} </div>
          <div className="mb-4 transition-opacity duration-300 ease-in-out transform hover:scale-150"> <SB /></div>
          <div className="mb-4 transition-opacity duration-300 ease-in-out transform hover:scale-150"> <NB /></div>
        </div>
      </div>
  );
};

export default Home;
