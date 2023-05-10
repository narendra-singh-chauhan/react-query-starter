// packages
import { useQuery, useMutation, useQueryClient } from 'react-query';
// utils
import request from '../utils/axios';


// query key
const queryKey = 'super-heroes';
// fetcher functions
const onGetSuperHeroes = () => {
    return request({ url: '/superheroes' });
}

const onAddSuperHero = (hero) => {
    return request({ url: '/superheroes', method: 'post', data: hero });
}

// hook: get super heroes
export const useSuperHeroes = (options) => {
    const queryOptions = {
        // cacheTime: 5000,
        // staleTime: 30000,
        // refetchOnMount: true,
        // refetchOnWindowFocus: true,
        // refetchIntervalInBackground: true,
        // enabled: false,
        // refetchInterval,
        // select: (data) => {
        //     return data.data.map(hero => hero.name)
        // },
        ...options
    };

    return useQuery(queryKey, onGetSuperHeroes, queryOptions)
};

// hook: add super hero
export const useAddSuperHero = () => {
    const queryClient = useQueryClient();
    return useMutation(onAddSuperHero, {
        // onSuccess: (data) => {
        //     console.log('on add super hero success');
        //     // queryClient.invalidateQueries(queryKey);
        //     queryClient.setQueryData(queryKey, (oldSuperHeroesData) => {
        //         return {
        //             ...oldSuperHeroesData,
        //             data: [...oldSuperHeroesData.data, data.data]
        //         };
        //     });
        // },

        // Optimistic updates
        onMutate: async (newHero) => {
            await queryClient.cancelQueries(queryKey);
            const prevHeroData = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (oldSuperHeroesData) => {
                return {
                    ...oldSuperHeroesData,
                    data: [...oldSuperHeroesData.data, { id: oldSuperHeroesData?.data?.length + 1, ...newHero }]
                };
            });
            return { prevHeroData };
        },
        onError: (_error, _hero, context) => {
            queryClient.setQueryData(queryKey, context.prevHeroData);
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
}