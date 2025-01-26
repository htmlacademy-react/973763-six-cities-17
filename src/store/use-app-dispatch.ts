import {useDispatch} from 'react-redux';
import type {AppDispatch} from './types.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
