import {create} from 'zustand';

interface BoardState{
    board:Board
}
export const useBoardStore= create<BoardState>((set,get)=>({

    board:{
        columns:new Map<TypedColumn, Column>(),
    },
}))