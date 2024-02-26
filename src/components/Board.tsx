"use client";
import { getTodosGroupByColumn } from "@/lib/GetTodosGroupByColumns";
import Column from "./Column";
import { useBoardStore } from "@/store/BoardStore";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

const Board = () => {
  const [board, getBoard, setBoardState,updateTodoInDB] = useBoardStore((state) => [state.board , state.getBoard, state.setBoardState, state.updateTodoInDB]);
  
  useEffect(()=>{
    getBoard()
  },[getBoard])

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, type, source } = result;
    if (!destination){ return};
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    }

    //column
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];
    const startcol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };
    if (!startcol || !finishCol) {return};
    if (source.index === destination.index && startcol === finishCol) {return};

    const newTodos = startcol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startcol.id === finishCol.id) {
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startcol.id,
        todos: newTodos,
      };

      const newColumn = new Map(board.columns);
      newColumn.set(startcol.id, newCol);
      setBoardState({ ...board, columns: newColumn });
    } else {
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newColumn = new Map(board.columns);

      const newCol = {
        id: startcol.id,
        todos: newTodos,
      };
      newColumn.set(startcol.id, newCol);
      newColumn.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodoInDB(todoMoved, finishCol.id);
      setBoardState({ ...board, columns: newColumn });
    }
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
