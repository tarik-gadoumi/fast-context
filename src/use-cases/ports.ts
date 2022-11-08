import type { counterState } from "../domain/counter";

export interface counterStorageService {
  state: counterState;
  updateCounter(state: Partial<counterState>): void;
}
