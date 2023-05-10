/* eslint-disable react/prop-types */
// packages
import { useQuery } from 'react-query';
import axios from 'axios';

const getUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
}

const getCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`);
}


const DependentQueriesPage = ({ email }) => {
    const { data: user } = useQuery(['user', email], () => getUserByEmail(email));
    const channelId = user?.data.channelId;
    const { data: channel } = useQuery(
        ['courses', channelId],
        () => getCoursesByChannelId(channelId),
        { enabled: !!channelId }
    );

    console.log({ user, channel });

    return (
        <div>Dependent Queries Page</div>
    );
};

export default DependentQueriesPage;