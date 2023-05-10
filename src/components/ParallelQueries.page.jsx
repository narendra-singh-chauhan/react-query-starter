// packages
import { useQuery } from 'react-query';
import axios from 'axios';


const getSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
}

const getFriends = () => {
    return axios.get('http://localhost:4000/friends');
}

const ParallelQueriesPage = () => {
    const { data: superHeroes } = useQuery('super-heroes', getSuperHeroes);
    const { data: friends } = useQuery('friends', getFriends);

    console.log({ superHeroes, friends });

    return (
        <div>Parellel Queries</div>
    );
};

export default ParallelQueriesPage;