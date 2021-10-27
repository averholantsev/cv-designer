export function setState<T>(state: T, payload: Partial<T>): T {
  return { ...state, ...payload };
}

export function resetState<T>(initialState: T): () => T {
  return function (): T {
    return { ...initialState };
  };
}
