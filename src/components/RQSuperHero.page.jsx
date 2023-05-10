// packages
import { useParams } from 'react-router-dom';
// hooks
import useSuperHero from '../hooks/useSuperHero';


const RQSuperHeroPage = () => {
    const { heroId } = useParams();
    const {
        isLoading,
        data,
        isError,
        error,
    } = useSuperHero(heroId);

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

    return <div>
        <div>Super Hero Details</div>
        <div>{data?.data.name} - {data?.data.alterEgo}</div>
    </div>
};

export default RQSuperHeroPage;