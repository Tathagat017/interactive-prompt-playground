import { createContext, ReactNode } from "react";
import { queryClient } from "../utils/query-client";
import { AppStore } from "./app-store";

// eslint-disable-next-line react-refresh/only-export-components
export const store = {
  appStore: new AppStore(),
  queryClient,
};

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(store);

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
