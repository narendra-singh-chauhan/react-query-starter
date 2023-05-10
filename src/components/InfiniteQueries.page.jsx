// packages
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';


const getAllColors = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
}

const InfiniteQueriesPage = () => {
    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(
        'colors',
        getAllColors,
        {
            getNextPageParam: (_lastPage, pages) => {
                if (pages.length < 4) {
                    return pages.length + 1;
                } else {
                    return undefined;
                }
            }
        }
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
            <div>Infinite Queries Page</div>
            <div>
                {data?.pages.map((group, index) => (
                    <div key={index}>
                        {group.data.map((color) => (
                            <div key={color.id}>{color.id} - {color.label}</div>
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More</button>
            </div>

            <div>
                {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
            </div>
        </div>
    );
};

export default InfiniteQueriesPage;