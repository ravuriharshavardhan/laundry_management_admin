'use client'
import { store } from '../Redux/Slice/Store';
import { Provider } from 'react-redux';


export default function StoreProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}