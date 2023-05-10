// packages
import axios from 'axios';
import { useState, useEffect } from 'react';


const SuperHeroesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/superheroes').then((res) => {
            setData(res.data);
            setIsLoading(false);
        }).catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    if (error) {
        return (
            <div>{error}</div>
        );
    }

    return (
        <>
            <h2>Traditional Super Heroes Page</h2>
            <div>
                {data.map((hero) => {
                    return (
                        <div key={hero.id}>{hero.name}</div>
                    );
                })}
            </div>
        </>
    );
}

export default SuperHeroesPage;