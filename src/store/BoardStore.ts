import {create} from 'zustand';

interface BoardState{
    board:Board,
    searchString:string,

    setSearchString:(searchString:string)=>void,
}
export const useBoardStore= create<BoardState>((set,get)=>({

    board:{
        columns:new Map<TypedColumn, Column>(),
    },
    searchString:"",
    setSearchString:(searchString)=>set({searchString})
}))