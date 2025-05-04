import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../../services/firebaseConnection";
import { EditTaskModal } from "../../components/editTaskModal";

interface TasksProps {
  id: string;
  name: string;
  done: boolean;
}

export function Dashboard() {
  const [modalState, setModalState] = useState(false);
  const [tasks, setTasks] = useState<TasksProps[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      let lista: TasksProps[] = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          done: doc.data().done,
        });
      });

      setTasks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  async function handleDeleteTask(id: string) {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toast.success("Tarefa excluida com sucesso.");
    } catch (error) {
      toast.error("Não foi possível deletar a tarefa.");
      console.log(error);
    }
  }

  async function handleToggleTask(id: string, done: boolean) {
    try {
      await updateDoc(doc(db, "tasks", id), {
        done: !done,
      });
      if (done === !true) {
        toast.success("Tarefa concluída com sucesso.");
      }
    } catch (error) {
      toast.error("Não foi possível atualizar a tarefa.");
      console.log(error);
    }
  }

  function handleOpenModal() {
    setModalState(true);
  }

  function handleCloseModal() {
    setModalState(false);
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">
        <span className="text-indigo-500">Task</span> Manager
      </h1>
      <main
        className={`${
          tasks.length > 0 ? "bg-white" : "bg-none"
        } w-full rounded-lg p-5 flex flex-col gap-4`}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <section
              key={task.id}
              className="flex items-center justify-between p-4 border-b-1 border-zinc-300"
            >
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  checked={task.done}
                  onChange={() => handleToggleTask(task.id, task.done)}
                />
                <span className="text-lg font-medium">{task.name}</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleOpenModal}
                  className="px-4 bg-yellow-200 text-lg text-yellow-500 border-1 border-yellow-300 rounded-lg cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-4 bg-red-200 text-lg text-red-500 border-1 border-red-300 rounded-lg cursor-pointer"
                >
                  Excluir
                </button>
              </div>
              <EditTaskModal
                state={modalState}
                closeModal={handleCloseModal}
                task={task.name}
                id={task.id}
              />
            </section>
          ))
        ) : (
          <p className="text-lg font-medium text-center">
            Parece que você não tem nenhuma tarefa...
          </p>
        )}
      </main>
    </div>
  );
}
