import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  id: number;
  name: string;
  image?: string | null;
}

const initialState: Card[] = JSON.parse(sessionStorage.getItem('cards') || '[]');

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<{ name: string; image?: string | null }>) {
      const { name, image = null } = action.payload;

      if (state.some((card) => card.name === name)) {
        throw new Error('Card name must be unique');
      }

      const newCard = {
        id: Date.now(),
        name,
        image,
      };

      const updatedState = [...state, newCard];
      sessionStorage.setItem('cards', JSON.stringify(updatedState));
      return updatedState;
    },
    deleteCard(state, action: PayloadAction<{ id: number }>) {
      const updatedState = state.filter((card) => card.id !== action.payload.id);
      sessionStorage.setItem('cards', JSON.stringify(updatedState));
      return updatedState;
    },
    resetCards() {
      return initialState;
    },
  },
});

export const { addCard, deleteCard, resetCards } = cardSlice.actions;

export default cardSlice.reducer;
