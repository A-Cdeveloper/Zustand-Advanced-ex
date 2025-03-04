import { PropsWithChildren, createContext, useContext, useState } from "react";
import { StoreApi, createStore, useStore } from "zustand";

type CountStoreType = {
  count: number;
  inc: () => void;
};

const CountContext = createContext<StoreApi<CountStoreType> | null>(null);

type CountContextPropsType = PropsWithChildren & {
  initialCount: number;
};

export const CountContextProvider = ({
  children,
  initialCount,
}: CountContextPropsType) => {
  // store set only once initialy
  const [store] = useState(() => {
    return createStore<CountStoreType>((set) => ({
      count: initialCount,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }));
  });

  return (
    <CountContext.Provider value={store}>{children}</CountContext.Provider>
  );
};

export default CountContext;

/////////////// hook to use store in components wraped by context
export const useCountStore = <T,>(selector: (state: CountStoreType) => T) => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCountStore must be used within a CountContextProvider");
  }

  return useStore(context, selector);
};
