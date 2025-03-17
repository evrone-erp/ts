import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch } from './types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector = useSelector;
