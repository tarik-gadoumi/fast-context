import * as React from "react";
import { useIncrement } from "../use-cases/increment";
import { useDecrement } from "../use-cases/decrement";
import { useCounterStorageAdapter } from "../services/storageAdapter";
import Screen from "./screen";
import { useFastDecrement } from "../use-cases/decrementFastContext";
import CounterProvider from "../services/store";
function FastDecrement() {
  const fastDec = useFastDecrement("countTwo");
  return <button onClick={fastDec}>Fast Decrement</button>;
}

function Display({ value }) {
  const { state } = useCounterStorageAdapter((store) => store[value]);
  return <div style={{ marginBottom: "30px" }}>{state}</div>;
}

const BtnOne = React.memo(() => {
  const decrement = useDecrement("count");
  return <button onClick={decrement}>Decrement</button>;
});
const BtnTwo = React.memo(() => {
  const increment = useIncrement("count");
  return <button onClick={increment}>Increment</button>;
});
function TwoBtn() {
  return (
    <div>
      {" "}
      <BtnOne />
      <BtnTwo />
    </div>
  );
}

export function Counter(): React.ReactElement {
  return (
    <CounterProvider>
      <Display value="count" />
      <TwoBtn />
      <Display value="countTwo" />
      <FastDecrement />
    </CounterProvider>
  );
}
// import React, {
//   useRef,
//   createContext,
//   useContext,
//   useCallback,
//   useSyncExternalStore,
// } from "react";

// type Store = { first: string; last: string };

// function useStoreData(): {
//   get: () => Store;
//   set: (value: Partial<Store>) => void;
//   subscribe: (callback: () => void) => () => void;
// } {
//   const store = useRef({
//     count: 0,
//     countTwo: 0,
//   });

//   const get = useCallback(() => store.current, []);

//   const subscribers = useRef(new Set<() => void>());

//   const set = useCallback((value: Partial<Store>) => {
//     store.current = { ...store.current, ...value };
//     subscribers.current.forEach((callback) => callback());
//   }, []);

//   const subscribe = useCallback((callback: () => void) => {
//     subscribers.current.add(callback);
//     return () => subscribers.current.delete(callback);
//   }, []);

//   return {
//     get,
//     set,
//     subscribe,
//   };
// }

// type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

// const StoreContext = createContext<UseStoreDataReturnType | null>(null);

// function Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <StoreContext.Provider value={useStoreData()}>
//       {children}
//     </StoreContext.Provider>
//   );
// }

// function useStore<SelectorOutput>(
//   selector: (store: Store) => SelectorOutput
// ): [SelectorOutput, (value: Partial<Store>) => void] {
//   const store = useContext(StoreContext);
//   if (!store) {
//     throw new Error("Store not found");
//   }

//   // const state = useSyncExternalStore(store.subscribe, () =>
//   //   selector(store.get())
//   // );
//   console.log(store.get());
//   const [state, setState] = React.useState(() => {
//     return selector(store.get());
//   });

//   React.useEffect(() => {
//     return store.subscribe(() => setState(selector(store.get()))); // pk j'ai ajouter selector ici ?
//   }, []);

//   console.log(selector(store.get()));
//   return [state, store.set];
// }

// const Increment = ({ value }: { value: "count" }) => {
//   const [fieldValue, setStore] = useStore((store) => store[value]);
//   return (
//     <div className="field">
//       {value}:{" "}
//       <button onClick={() => setStore({ [value]: parseInt(fieldValue + 1) })} />
//     </div>
//   );
// };
// const Decrement = ({ value }: { value: "countTwo" }) => {
//   const [fieldValue, setStore] = useStore((store) => store[value]);
//   return (
//     <div className="field">
//       {value}:{" "}
//       <button onClick={() => setStore({ [value]: parseInt(fieldValue - 1) })} />
//     </div>
//   );
// };
// const Display = ({ value }: { value: "count" | "countTwo" }) => {
//   const [fieldValue] = useStore((store) => store[value]);
//   return (
//     <div className="value">
//       {value}: {fieldValue}
//     </div>
//   );
// };

// const FormContainer = () => {
//   return (
//     <div className="container">
//       <h5>FormContainer</h5>
//       <Increment value="count" />
//       <Decrement value="countTwo" />
//       {/**
//        * ici ci je remplace par countTwo et bah le programme remarche
//        * pq ce behvior ?
//        * eh bien parceque :
//        * je vais  puiser dans la même cléf donc : tous les elements
//        * qui consomment cette clef  ils seront rerender
//        * ce qui est logique
//        * mais ce que je n'arrive pas a expliquer comment ce fait t-il
//        * que quand un  elemnt pioche dans selon une clef X  et bien rerender
//        * ne ce fait pas pour les elements qui on besoin de piocher dans la
//        * clef Y ?????????
//        */}
//     </div>
//   );
// };

// const DisplayContainer = () => {
//   return (
//     <div className="container">
//       <h5>DisplayContainer</h5>
//       <Display value="count" />
//       <Display value="countTwo" />
//     </div>
//   );
// };

// const ContentContainer = () => {
//   return (
//     <div className="container">
//       <h5>ContentContainer</h5>
//       <FormContainer />
//       <DisplayContainer />
//     </div>
//   );
// };
// export function Counter() {
//   return (
//     <Provider>
//       <div className="container">
//         <h5>App</h5>
//         <ContentContainer />
//       </div>
//     </Provider>
//   );
// }
