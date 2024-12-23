import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {State} from './types.ts';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
