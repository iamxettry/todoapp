"use client";
import { getTodosGroupByColumn } from "@/lib/GetTodosGroupByColumns";
import Column from "./Column";
import { useBoardStore } from "@/store/BoardStore";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [state.board , state.getBoard]);
  
  useEffect(()=>{
    getBoard()
  },[getBoard])

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl lg:max-w-6xl mx-4 md:mx-auto mt-12"
            >
              {Array.from(board.columns.entries()).map(([id, column], index) => (
                <Column key={id} id={id} todos={column.todos} index={index} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
