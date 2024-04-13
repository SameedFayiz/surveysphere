"use client";
import { createContext, useState } from "react";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={[data, setData]}>
      {children}
    </DataContext.Provider>
  );
};
export { DataContext };
export default DataContextProvider;
