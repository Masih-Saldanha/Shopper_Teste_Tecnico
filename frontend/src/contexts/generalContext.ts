import { createContext } from 'react';

type GeneralContextType = {
  global: string;
  teste: string;
};

const GeneralContext = createContext<GeneralContextType | null>(null);

export default GeneralContext;
