'use client';

import { ReactNode } from 'react';
//Context
import { GlobalContextProvider } from '../context/MainContextProvider';

const Providers = ({ children }:{children:ReactNode}) => {

  return (
      <GlobalContextProvider>
          {children}
      </GlobalContextProvider>
  )
}

export default Providers