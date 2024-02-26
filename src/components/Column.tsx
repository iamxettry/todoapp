import React from "react";
import TodoCart from "./TodoCart";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};
const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};
const Column = ({ id, todos, index }: Props) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [state.searchString, state.setNewTaskType]);
const [openModel] =useModalStore(state=>[state.openModel])
  const handleAddTodo =()=>{
    setNewTaskType(id)
    openModel()
  }
  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Droppable droppableId={index.toPrecision()} type="card">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={` p-2 rounded-2xl shadow-sm ${
                    snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                  }`}
                >
                  <h2 className="flex justify-between items-center font-bold text-xl p-2">
                    {idToColumnText[id]}

                    <span className="text-gray-700 bg-gray-200 rounded-full h-6 w-6 text-center text-sm font-normal">
                      2
                    </span>
                  </h2>

                  <div className="">
                    {/* map method */}
                    {todos.map((todo, index) => {
                      if (
                        searchString &&
                        !todo.title
                          .toLowerCase()
                          .includes(searchString.toLowerCase())
                      ) {
                        return null;
                      }

                      return (
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <TodoCart
                              todo={todo}
                              index={index}
                              id={id}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                    })}

                    {provided.placeholder}
                    <div className="flex  items-end justify-end p-2">
                      <button className="bg-[#0efb16] hover:bg-[#00b500] rounded-full p-1" onClick={handleAddTodo}>
                        <Plus size={16} color="white"  />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
