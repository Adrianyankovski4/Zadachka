import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    name: string;
    age: number;
    bio: string;
    avatar: string;
}

const initialState: ProfileState = JSON.parse(sessionStorage.getItem('profile') || JSON.stringify({
    name: 'Test User',
    age: 25,
    bio: 'This is a test user.',
    avatar: '/snimka.jpg',
}));

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action: PayloadAction<Partial<ProfileState>>) {
            const updatedState = { ...state, ...action.payload };
            sessionStorage.setItem('profile', JSON.stringify(updatedState));
            return updatedState;
        },
        resetProfile() {
            return initialState;
        },

    },
});

export const { updateProfile, resetProfile} = profileSlice.actions;
export default profileSlice.reducer;
