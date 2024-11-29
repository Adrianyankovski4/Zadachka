import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    name: string;
    age: number;
    bio: string;
    avatar: string;
}

const initialState: ProfileState = JSON.parse(sessionStorage.getItem('profile') || JSON.stringify({
    name: 'Vanko1',
    age: 25,
    bio: '"Кеф ти ламборджини, кеф ти две хиледарки...\n' +
        'И накрая пак се питаш: \'Ванко, ти ли си Рио боса?\'',
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
