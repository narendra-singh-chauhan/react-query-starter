// packages
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

// query key
const queryKey = 'super-heroes';
// fetcher function
const getSuperHeroById = ({ queryKey }) => {
    const heroId = queryKey[1];
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

// hook: get super hero
const useSuperHero = (heroId) => {
    const queryClient = useQueryClient();
    return useQuery(
        ['super-hero', heroId],
        getSuperHeroById,
        {
            initialData: () => {
                const hero = queryClient.getQueryData(queryKey)?.data?.find(hero => hero.id === parseInt(heroId));

                if (hero) {
                    return { data: hero };
                } else {
                    return undefined;
                }
            }
        }
    );
};

export default useSuperHero;

// If we have some data already then we can show existing data in place of loading indicator by using useQueryClient hooks.
// The api call is runs on the background and when completed it will automatically update the ui with updated data.