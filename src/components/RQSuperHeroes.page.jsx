// packages
import { Link } from 'react-router-dom';
import { useState } from 'react';
// hooks
import { useSuperHeroes, useAddSuperHero } from '../hooks/useSuperHeroes';


const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data);
}

const onError = (error) => {
    console.log('Perform side effect after encountering error', error);
}

const options = {
    onSuccess,
    onError,
    // enabled: false,
};

const RQSuperHeroesPage = () => {
    const [hero, setHero] = useState({ name: '', alterEgo: '' });
    const { mutate } = useAddSuperHero();
    const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroes(options);

    const onChange = ({ target }) => {
        const { name, value } = target;
        setHero(prev => ({ ...prev, [name]: value }));
    }

    if (isLoading || isFetching) {
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
        <>
            <h2>RQ Super Heroes Page</h2>
            <div>
                <input
                    type='text'
                    value={hero.name}
                    onChange={onChange}
                />
                <input
                    type='text'
                    value={hero.alterEgo}
                    onChange={onChange}
                />
                <button onClick={() => mutate(hero)}>Add Hero</button>
            </div>
            <button onClick={refetch}>Fetch Heroes</button>
            <div>
                {data?.data.map((hero) => {
                    return (
                        <div key={hero.id}>
                            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RQSuperHeroesPage;