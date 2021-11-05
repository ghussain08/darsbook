import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

const useAppDispatch = () => useDispatch<AppDispatch>();
export default useAppDispatch;
