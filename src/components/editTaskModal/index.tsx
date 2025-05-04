import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { FiX } from "react-icons/fi";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface NewTaskModalProps {
  state: boolean;
  closeModal: () => void;
  task: string;
  id: string;
}

export function EditTaskModal({
  state,
  closeModal,
  task,
  id,
}: NewTaskModalProps) {
  const [taskEdited, setTaskEdited] = useState<string>();

  useEffect(() => {
    async function loadTask() {
      try {
        const snapshot = await getDoc(doc(db, "tasks", id));

        if (snapshot) {
          setTaskEdited(snapshot.data()?.name);
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadTask();
  }, []);

  async function handleEditTask(e: FormEvent) {
    e.preventDefault();

    if (!taskEdited) {
      toast.error("Digite algo no campo nome.");
    }

    try {
      await updateDoc(doc(db, "tasks", id), {
        name: taskEdited,
      });
      toast.success("Tarefa editada com sucesso.");
      setTaskEdited("");
      closeModal();
    } catch (error) {
      toast.error("Não foi possível editar a tarefa.");
      console.log(error);
    }
  }

  if (state) {
    return (
      <div
        className={`bg-black/35 absolute left-0 bottom-0 h-screen w-screen flex items-center justify-center`}
      >
        <div className="w-full max-w-md bg-white rounded-lg mx-4">
          <header className="h-14 border-b-1 rounded-t-lg bg-gray-100 border-zinc-300 flex items-center justify-between px-4 mb-4">
            <span className="text-lg font-medium">{task}</span>
            <button className="cursor-pointer" onClick={closeModal}>
              <FiX size={27} />
            </button>
          </header>
          <form
            onSubmit={handleEditTask}
            className="flex flex-col gap-4 w-full px-4"
          >
            <label htmlFor="task" className="text-lg font-medium">
              Novo Nome da Tarefa
            </label>
            <input
              type="text"
              id="task"
              value={taskEdited}
              onChange={(e) => setTaskEdited(e.target.value)}
              className="h-12 outline-none border-1 border-zinc-300 rounded-lg px-4 text-zinc-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-indigo-500 text-white font-medium h-12 rounded-lg px-8 w-fit mb-4 self-end cursor-pointer"
            >
              Salvar Tarefa
            </button>
          </form>
        </div>
      </div>
    );
  }
}
