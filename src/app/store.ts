import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import cardReducer from '../features/cards/cardsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        cards: cardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;