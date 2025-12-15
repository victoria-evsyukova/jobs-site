import { type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import { type AppDispatch, type RootState } from "../../redux/store/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
 