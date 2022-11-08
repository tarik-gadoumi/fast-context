import * as React from "react";
import { counterState } from "../domain/counter";

type Store = counterState;

function useStoreData(): {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void; // the last ()=>void is the unsubscribe fn
} {
  const store = React.useRef<Store>({ count: 0, countTwo: 0, status: "idle" });

  const get = React.useCallback(() => store.current, []);

  const subscribers = React.useRef(new Set<() => void>());

  const set = React.useCallback((value: Partial<Store>) => {
    store.current = { ...store.current, ...value };
    subscribers.current.forEach((cb) => cb());
  }, []);

  const subscribe = React.useCallback((callback: () => void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, []);

  return { get, set, subscribe };
}

type StoreContextDataType = ReturnType<typeof useStoreData>;

const StoreContext = React.createContext<StoreContextDataType | null>(null);

export const useStore = (
  selector?: (store: Store) => any
): {
  state: Store; // it will become "any" in a generic context
  updateCounter: (value: Partial<Store>) => void;
} => {
  const store = React.useContext<any>(StoreContext);

  if (!store) {
    throw new Error("Store not found");
  }
  // const [state, setState] = React.useState(() => {
  //   return selector ? selector(store.get()) : store.get();
  // });

  // React.useEffect(() => {
  //   return store.subscribe(() => setState(store.get()));
  // }, []);

  const state = React.useSyncExternalStore(store.subscribe, () => {
    return selector ? selector(store.get()) : store.get();
  });

  return { state: state, updateCounter: store.set };
};

export default function CounterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useStoreData();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

// interface Props {
//   children: React.ReactNode;
// }

// export const Provider: React.FC<Props> = ({ children }) => {
//   return <CounterProvider>{children}</CounterProvider>;
// };
