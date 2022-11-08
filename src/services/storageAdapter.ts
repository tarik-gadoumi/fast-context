import { counterStorageService } from "../use-cases/ports";
import { useStore } from "./store";
type Store = {
  count: number;
  status: "idle" | "loading" | "success" | "rejected";
};
export function useCounterStorageAdapter(
  fn?: (store: Store) => Partial<Store>
): counterStorageService {
  return useStore(fn);
}
