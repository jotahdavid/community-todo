'use client';

import { useCallback, useEffect, useState } from 'react';

import { AddUsernameModal } from '@/components/Modal/AddUsernameModal';
import { TodoItem } from '@/components/TodoItem';
import { NewTaskDTO, Task } from '@/repositories/TaskRepository';
import { CreateTaskModal, type NewTask as NewTask } from '@/components/Modal/CreateTaskModal';
import { Category } from '@prisma/client';
import tasksService from '@/services/tasksService';

interface ClientComponentProps {
  initialTasks: Task[];
  categories: Category[];
  saveTask: (newTask: NewTaskDTO) => Promise<unknown>;
  toggleTaskStatus: (taskId: number) => Promise<unknown>;
}

const LOCAL_STORAGE_KEYS = {
  MINECRAFT_NICKNAME: 'MINECRAFT_NICKNAME',
};

export function ClientComponent({ categories, initialTasks, saveTask, toggleTaskStatus }: ClientComponentProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isAddUsernameModalOpen, setIsAddUsernameModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  useEffect(() => {
    const nickname = localStorage.getItem(LOCAL_STORAGE_KEYS.MINECRAFT_NICKNAME);
    setNickname(nickname);
    setIsAddUsernameModalOpen(!nickname);
    setIsLoading(false);
  }, []);

  const handleAddUsernameSubmit = useCallback(async (nickname: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.MINECRAFT_NICKNAME, nickname);
    setIsAddUsernameModalOpen(false);
  }, []);

  function handleOpenCreateTaskModal() {
    setIsCreateTaskModalOpen(true);
  }

  async function refreshTasks() {
    const newTasks = await tasksService.getAll();
    setTasks(newTasks);
  }

  async function handleAddTask(newTask: NewTask) {
    if (!nickname) return;
    setIsCreateTaskModalOpen(false);
    await saveTask({
      ...newTask,
      createdBy: nickname,
    });
    await refreshTasks();
  }

  function handleCloseCreateTaskModal() {
    setIsCreateTaskModalOpen(false);
  }

  async function handleCheckClick(task: Task) {
    await toggleTaskStatus(task.id);
    await refreshTasks();
  }

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  if (isLoading) {
    // TODO: adicionar componente Loader/Spinner
    return null;
  }

  return (
    <>
      {isAddUsernameModalOpen && <AddUsernameModal onSubmit={handleAddUsernameSubmit} />}

      {isCreateTaskModalOpen && (
        <CreateTaskModal
          categories={categories}
          onAdd={handleAddTask}
          onClose={handleCloseCreateTaskModal}
        />
      )}

      <aside className="h-full bg-green-dark px-16 py-14 w-full max-w-[390px] flex flex-col justify-between overflow-y-auto">
        <header>
          <h1 className="text-5xl mb-20 font-vt323 uppercase text-center">ServerdeMine</h1>

          <div className="flex flex-col gap-y-5 mb-10 pb-10 border-b">
            <a className="text-2xl hover:underline underline-offset-2" href={process.env.NEXT_PUBLIC_DOC_URL}>
              Documentação
            </a>
          </div>

          <div>
            <strong className="text-2xl mb-5 block">Categorias</strong>
            <ul className="space-y-5">
              {['Construção', 'Exploração', 'Automação'].map((categoryName) => (
                <li key={categoryName}>
                  <a className="font-vt323 text-2xl hover:underline underline-offset-2" href="#">
                    # {categoryName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <footer className="mt-4 flex justify-center">
          <a href="https://studiomodus.com.br" target="_blank">
            <img src="/logo.webp" alt="Logo do StudioModus" title="Studio Modus" />
          </a>
        </footer>
      </aside>

      <main className="h-full w-full bg-[#6aa84f] bg-[url('/minepattern.png')] overflow-y-auto">
        <div className="h-full p-14 flex flex-col">
          <button
            className="font-vt323 w-fit bg-green-dark py-2 px-8 rounded-sm hover:bg-green-900 transition-colors"
            onClick={handleOpenCreateTaskModal}
          >
            Nova tarefa
          </button>

          <hr className="mt-8 mb-4" />

          <h2 className="text-2xl mb-7 font-bold">A fazer</h2>

          <ul className="space-y-4 flex-1">
            {pendingTasks.map((pendingTask) => (
              <li key={pendingTask.id}>
                <TodoItem onCheck={handleCheckClick} todo={pendingTask} />
              </li>
            ))}
          </ul>

          <hr className="mt-8 mb-4" />

          <h2 className="text-2xl mb-7 font-bold">Concluido</h2>

          <ul className="space-y-4 pb-14">
            {completedTasks.map((completedTask) => (
              <li key={completedTask.id}>
                <TodoItem onCheck={handleCheckClick} todo={completedTask} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
