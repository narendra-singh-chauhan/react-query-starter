/* eslint-disable react/prop-types */
// packages
import { useQueries } from 'react-query';
import axios from 'axios';


const getSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

const DynamicParallelPage = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map(id => ({
            queryKey: ['super-hero', id],
            queryFn: () => getSuperHero(id),
        }))
    );

    console.log({ queryResults });

    return (
        <div>Dynamic Parallel Queries</div>
    );
};

export default DynamicParallelPage;