import { getTodosGroupByColumn } from '@/lib/GetTodosGroupByColumns';
import {create} from 'zustand';

interface BoardState{
    board:Board;
    searchString:string;

    getBoard:()=>void;
    setSearchString:(searchString:string)=>void;
}
export const useBoardStore= create<BoardState>((set,get)=>({

    board:{
        columns:new Map<TypedColumn, Column>(),
    },
    searchString:"",
    setSearchString:(searchString)=>set({searchString}),
    getBoard: async () => {
        const board = await getTodosGroupByColumn();
        set({ board });
      },
}))