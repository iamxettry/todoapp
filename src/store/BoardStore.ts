import { getTodosGroupByColumn } from '@/lib/GetTodosGroupByColumns';
import {create} from 'zustand';

interface BoardState{
    board:Board;
    searchString:string;
    newTaskType:TypedColumn;
    newTaskInput:string;
    image:File | null;
    getBoard:()=>void;
    setSearchString:(searchString:string)=>void;

    setNewTaskType:(columnId:TypedColumn)=>void
    setNewTaskInput:(input:string)=>void
    setImage: (image: File | null) => void;
}
export const useBoardStore= create<BoardState>((set,get)=>({

    board:{
        columns:new Map<TypedColumn, Column>(),
    },
    searchString:"",
    newTaskType:"todo",
    newTaskInput:"",
    image:null,
    setSearchString:(searchString)=>set({searchString}),
    getBoard: async () => {
        const board = await getTodosGroupByColumn();
        set({ board });
      },
    setNewTaskType:(columnId:TypedColumn)=>set({newTaskType:columnId}),
    setNewTaskInput:(input:string)=>set({newTaskInput:input}),
    setImage:(image:File | null)=>set({image})
}))