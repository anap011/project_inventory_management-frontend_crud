import { useState, useEffect } from 'react';

const GetRequest = (endpoint) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const url = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/${endpoint}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    });

    if (data==null){
        return console.log("DATA ESTÁ VACIO"); 
    }else{
        return { data, error };
    }
    
};

export default GetRequest;
