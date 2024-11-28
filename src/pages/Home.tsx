import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Typography, Container, Avatar } from '@mui/material';

const Home: React.FC = () => {
    const profile = useSelector((state: RootState) => state.profile);

    return (
        <Container>
            <Typography variant="h4">Welcome, {profile.name}!</Typography>
            <Avatar src={profile.avatar} sx={{ width: 100, height: 100, marginTop: 2 }} />
            <Typography>Age: {profile.age}</Typography>
            <Typography>Bio: {profile.bio}</Typography>
        </Container>
    );
};

export default Home;
