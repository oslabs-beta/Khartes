import React, { createContext, useContext, useState} from 'react';

interface DataContextInterface {
  name: string;
  author: string;
  url: string;
}

const DataContext = createContext<DataContextInterface | null> (null);
const DataUpdateContext = createContext<DataContextInterface | null> (null)

export function useDataContext () {
  return useContext(DataContext);
}

export function useDataUpdateContext () {
  return useContext(DataUpdateContext);
}