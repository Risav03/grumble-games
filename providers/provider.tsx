'use client';

import { ReactNode } from 'react';
//Context
import { GlobalContextProvider } from './MainContextProvider';

const Providers = ({ children }:{children:any}) => {

  return (
      <GlobalContextProvider>
          {children}
      </GlobalContextProvider>
  )
}

export default Providers