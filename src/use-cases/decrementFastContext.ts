import { useCounterStorageAdapter } from "../services/storageAdapter";
import { counterStorageService } from "./ports";
import * as React from "react";
export function useFastDecrement(which) {
  const { state, updateCounter }: counterStorageService =
    useCounterStorageAdapter((store) => store[which]);
  console.log("useFastDecrement", state);
  const memoizedFn = React.useCallback(() => {
    updateCounter({ [which]: parseInt(state - 1) });
  }, [state]);
  return memoizedFn;
}
