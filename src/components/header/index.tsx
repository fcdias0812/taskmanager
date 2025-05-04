import { useContext, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import { NewTaskModal } from "../newTaskModal";

export function Header() {
  const { user } = useContext(AuthContext);
  const [modalState, setModalState] = useState(false);

  function handleOpenModal() {
    setModalState(true);
  }

  function handleCloseModal() {
    setModalState(false);
  }

  return (
    <header className="w-full h-20 flex bg-white border-b border-zinc-300 mb-4 relative">
      <nav className="h-full w-full mx-auto max-w-5xl px-4 flex items-center justify-between">
        <div className="flex gap-4 items-center justify-center">
          <Link to="/">
            <FiLogOut size={29} className="text-red-500" />
          </Link>
          <strong className="text-2xl font-medium">Olá, {user?.name}!</strong>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-indigo-500 flex items-center justify-center rounded-lg px-8 h-12 font-medium text-lg text-white cursor-pointer"
        >
          Adicionar Tarefa
        </button>
      </nav>
      <NewTaskModal state={modalState} closeModal={handleCloseModal} />
    </header>
  );
}
