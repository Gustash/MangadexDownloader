/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {createContext, useReducer} from 'react';

import {types} from '../actions/library';

const LibraryContext = createContext();

const libraryReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_MANGA:
      return {
        ...state,
        manga: [...state.manga, action.payload],
      };
    default:
      return state;
  }
};

type Props = {
  children: React$Node,
};

export const LibraryProvider: (props: Props) => React$Node = ({children}) => {
  const [state, dispatch] = useReducer(libraryReducer, {
    manga: [],
  });

  return (
    <LibraryContext.Provider value={[state, dispatch]}>
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
