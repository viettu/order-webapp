import React, { useContext, createContext, useState } from 'react';

export interface IAppRuntimeProvider {
  setIsLoading: (isLoading: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
  isLoading: boolean;
  errorMessage: string;
}

interface AppRuntimeProviderProps {
  children?: React.ReactNode;
}

const AppRuntimeContext = createContext({} as any);
export const AppRuntimeProvider: React.FC<AppRuntimeProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <AppRuntimeContext.Provider
      value={{
        setIsLoading,
        setErrorMessage,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </AppRuntimeContext.Provider>
  );
};

export const useAppRuntime = () => useContext<IAppRuntimeProvider>(AppRuntimeContext);
