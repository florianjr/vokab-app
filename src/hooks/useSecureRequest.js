import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useSecureRequest = (uri, method = "GET", body = undefined) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      const token = await getAccessTokenSilently({
        audience: serverUrl,
      });
      try {
        if (body === undefined) {
          const response = await fetch(serverUrl + "/api" + uri, {
            method: method,
            headers: { Authorization: `Bearer ${token}` },
          });
          const responseData = await response.json();
          if (!ignore) setData(responseData);
        } else {
          const response = fetch(serverUrl + "/api" + uri, {
            method: method,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (!ignore) setData(response.data);
        }
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchProduct();
    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading, error };
};

export default useSecureRequest;
