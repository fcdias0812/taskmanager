import { FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

interface NewTaskModalProps {
  state: boolean;
  closeModal: () => void;
}

export function NewTaskModal({ state, closeModal }: NewTaskModalProps) {
  const [newTask, setNewTask] = useState<string>("");

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();

    if (!newTask) {
      toast.error("Digite algo no campo nome.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        name: newTask,
        created: new Date(),
        done: false,
      });
      toast.success("Tarefa criada com sucesso.");
      setNewTask("");
      closeModal();
    } catch (error) {
      toast.error("Não foi possível criar a tarefa.");
      console.log(error);
    }
  }

  if (state) {
    return (
      <div
        className={`bg-black/35 absolute h-screen w-screen flex items-center justify-center`}
      >
        <div className="w-full max-w-md bg-white rounded-lg mx-4">
          <header className="h-14 border-b-1 rounded-t-lg bg-gray-100 border-zinc-300 flex items-center justify-between px-4 mb-4">
            <span className="text-lg font-medium">Nova Tarefa</span>
            <button className="cursor-pointer" onClick={closeModal}>
              <FiX size={27} />
            </button>
          </header>
          <form
            onSubmit={handleAddTask}
            className="flex flex-col gap-4 w-full px-4"
          >
            <label htmlFor="task" className="text-lg font-medium">
              Nome da Tarefa
            </label>
            <input
              type="text"
              id="task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="h-12 outline-none border-1 border-zinc-300 rounded-lg px-4 text-zinc-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-indigo-500 text-white font-medium h-12 rounded-lg px-8 w-fit mb-4 self-end cursor-pointer"
            >
              Criar Tarefa
            </button>
          </form>
        </div>
      </div>
    );
  }
}
