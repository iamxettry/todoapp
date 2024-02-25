"use client";
import Column from "./Column";
import { useBoardStore } from "@/store/BoardStore";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

const data: Board = {
  columns: new Map([
    [
      "todo",
      {
        id: "todo",
        todos: [
          {
            $id: "1",
            $createdAt: "2024-02-24",
            title: "Task 1",
            status: "todo",
          },
          {
            $id: "2",
            $createdAt: "2024-02-24",
            title: "Task 2",
            status: "todo",
          },
          {
            $id: "3",
            $createdAt: "2024-02-24",
            title: "Task 3",
            status: "todo",
            image: "example_image_url_1",
          },
        ],
      },
    ],
    [
      "inprogress",
      {
        id: "inprogress",
        todos: [
          {
            $id: "4",
            $createdAt: "2024-02-24",
            title: "Task 4",
            status: "inprogress",
            image: "example_image_url_2",
          },
          {
            $id: "5",
            $createdAt: "2024-02-24",
            title: "Task 5",
            status: "inprogress",
          },
        ],
      },
    ],
    [
      "done",
      {
        id: "done",
        todos: [
          {
            $id: "6",
            $createdAt: "2024-02-24",
            title: "Task 6",
            status: "done",
            image: "example_image_url_3",
          },
          {
            $id: "7",
            $createdAt: "2024-02-24",
            title: "Task 7",
            status: "done",
          },
          {
            $id: "8",
            $createdAt: "2024-02-24",
            title: "Task 8",
            status: "done",
            image: "example_image_url_4",
          },
        ],
      },
    ],
  ]),
};

const Board = () => {
  const [board] = useBoardStore((state) => [state.board]);

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
              {Array.from(data.columns.entries()).map(([id, column], index) => (
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
