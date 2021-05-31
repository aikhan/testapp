import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
export interface AddressState {
  country: string;
  name: string;
  street: string;
  postCode: number | string;
  city: string;
}

// Define the initial state using that type
const initialState: AddressState = {
  country: '',
  name: '',
  street: '',
  postCode: 0,
  city: '',
};

export const addressSlice = createSlice({
  name: 'address',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveAddress: (state, action: PayloadAction<AddressState>) => {
      state.country = action.payload.country;
      state.name = action.payload.name;
      state.street = action.payload.street;
      state.postCode = action.payload.postCode;
      state.city = action.payload.city;
    },
  },
});

export const {saveAddress} = addressSlice.actions;

export const address = (state: RootState) => state.address;

export default addressSlice.reducer;
