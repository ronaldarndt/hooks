type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type UseHook<T> = [T, SetState<T>];
type UsePersist<T> = [T, React.Dispatch<React.SetStateAction<T>>, () => void];

export type { UseHook, SetState, UsePersist };
