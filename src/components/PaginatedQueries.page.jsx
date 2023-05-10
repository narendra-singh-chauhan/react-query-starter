// packages
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';


const getColors = (pageNumber) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
}

const PaginatedQueriesPage = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const { isLoading, isError, error, data, isFetching } = useQuery(
        ['colors', pageNumber],
        () => getColors(pageNumber),
        { keepPreviousData: true }
    );

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    if (isError) {
        return (
            <div>{error.message}</div>
        );
    }

    return (
        <div>
            <div>Paginated Queries Page</div>
            <div>
                {data?.data.map((color) => (
                    <div key={color.id}>{color.id} - {color.label}</div>
                ))}
            </div>
            <div>
                <button onClick={() => setPageNumber(prev => prev - 1)} disabled={pageNumber === 1}>Prev Page</button>
                <button onClick={() => setPageNumber(prev => prev + 1)} disabled={pageNumber === 4}>Next Page</button>
            </div>
            <div>{isFetching && 'Fetching'}</div>
        </div>
    );
};

export default PaginatedQueriesPage;