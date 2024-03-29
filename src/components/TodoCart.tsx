"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
type Props = {
  todo:Todo,
  id: TypedColumn;
  index: number;
  innerRef: (elment: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
const TodoCart = ({
  id,
  index,
  todo,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const deleteTask =useBoardStore(state=>state.deleteTask)
  useEffect(()=>{
    if (todo.image) {
      const fetchImage=async ()=>{
        const url=await getUrl(todo.image!)
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();

    }
  },[todo])
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md my-2  "
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="bg-[#fb0e0e] hover:bg-[#d40101] rounded-full p-1 " onClick={() => deleteTask(index, todo, id)}>
          <X color="white" size={16} />
        </button>
      </div>
      {imageUrl && (
        <div className=" h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            priority
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCart;


