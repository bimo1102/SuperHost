import { Dispatch, RootState } from '@/redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => Dispatch = useDispatch;
