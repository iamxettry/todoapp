import { getTodosGroupByColumn } from "@/lib/GetTodosGroupByColumns";
import uploadImage from "@/lib/uploadImage";
import { create } from "zustand";
import { ID, database, storage } from "../../appwrite";

interface BoardState {
  board: Board;
  searchString: string;
  newTaskType: TypedColumn;
  newTaskInput: string;
  image: File | null;
  getBoard: () => void;
  setSearchString: (searchString: string) => void;

  setNewTaskType: (columnId: TypedColumn) => void;
  setNewTaskInput: (input: string) => void;
  setImage: (image: File | null) => void;

  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;

  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
}
export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  newTaskType: "todo",
  newTaskInput: "",
  image: null,
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    const board = await getTodosGroupByColumn();
    set({ board });
  },
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  setImage: (image: File | null) => set({ image }),

  // add task
  addTask: async (
    todo: string,
    columnId: TypedColumn,
    image?: File | null | undefined
  ) => {
    let file: Image | undefined;
    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTIONS_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );
    set({ newTaskInput: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };
      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
  //   delete task
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTIONS_ID!,
      todo.$id
    );
  },
  updateTodoInDB: async (todo, columnId) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTIONS_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },
}));
