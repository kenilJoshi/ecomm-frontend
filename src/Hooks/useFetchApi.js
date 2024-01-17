import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, token) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios.get(url, {
            headers: {
                Authorization: token
              }
          });
          const data = await resp?.data;
  
          setApiData(data);
          setIsLoading(false);
        } catch (error) {
          setServerError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [url, token]);
  
    return { isLoading, apiData, serverError };
  };


export default useFetch