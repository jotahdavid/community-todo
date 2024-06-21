'use client';

import { Category } from '@prisma/client';
import { FormEvent, useState } from 'react';

import { cn } from '@/utils/cn';

export interface NewTodo {
  title: string;
  categories: number[];
}

interface CreateTaskModalProps {
  categories: Category[];
  onAdd?: (newTodo: NewTodo) => Promise<void>;
  onClose?: () => void;
}

export function CreateTaskModal({ categories, onAdd, onClose }: CreateTaskModalProps) {
  const [newTodo, setNewTodo] = useState<NewTodo>({
    title: '',
    categories: [],
  });
  const [error, setError] = useState<string | null>(null);

  function handleTaskTitleInput(event: FormEvent<HTMLInputElement>) {
    const title = event.currentTarget.value;

    setNewTodo((prevState) => ({
      ...prevState,
      title,
    }));
    setError(null);
  }

  function handleCategoryClick(id: number) {
    const index = newTodo.categories.findIndex((categoryId) => categoryId === id);

    setNewTodo((prevState) => {
      if (index === -1) {
        return {
          ...prevState,
          categories: [
            ...prevState.categories,
            id,
          ],
        };
      }

      const categories = prevState.categories.filter((categoryId) => categoryId !== id);

      return {
        ...prevState,
        categories,
      };
    });
  }

  function handleClose() {
    onClose?.();
  }

  function handleAdd() {
    if (newTodo.title.length < 4) {
      setError('Insira uma tarefa de no mínimo 4 caracteres.');
      return;
    }

    onAdd?.(newTodo);
  }

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4">
      <div className="max-w-[1000px] w-11/12 bg-green-light shadow-lg p-10 rounded-sm flex flex-col justify-center my-auto">
        <h2 className="font-vt323 text-8xl text-center mb-9">
          Nova Tarefa
        </h2>

        <div className="mb-10 w-11/12 mx-auto">
          <label htmlFor="createTaskModalInput" className="block text-3xl mb-3">
            Digite qual vai ser a tarefa:
          </label>

          <input
            id="createTaskModalInput"
            className="text-3xl p-4 block w-full bg-[#6AA84F] outline-none border-2 border-transparent focus-within:border-green-dark transition-colors mb-1"
            type="text"
            name="nickname"
            value={newTodo.title}
            onInput={handleTaskTitleInput}
          />
          {error && (
            <span className="text-red-600 font-bold text-lg">
              {error}
            </span>
          )}
        </div>

        <div className="w-11/12 mx-auto mb-14">
          <span className="block text-3xl mb-3">Seleciona a categoria:</span>

          <ul className="flex gap-3">
            {categories.map((category) => {
              const isActive = newTodo.categories.find((categoryId) => categoryId === category.id);

              return (
                <li key={category.id}>
                  <button
                    className={cn(
                      'font-vt323 text-2xl bg-white text-green-light rounded-sm py-1 px-2 hover:bg-green-dark hover:text-white transition-colors',
                      { 'bg-black/60': isActive, 'text-white': isActive }
                    )}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    # {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-between max-w-[420px] mx-auto w-full gap-2">
          <button
            className="font-vt323 text-3xl w-fit border-2 border-green-dark bg-green-dark py-2 px-8 rounded-sm hover:bg-green-900 hover:border-green-900 transition-colors"
            type="button"
            onClick={handleAdd}
          >
            Adicionar
          </button>

          <button
            className="font-vt323 text-3xl w-fit border-2 bg-transparent py-2 px-8 rounded-sm hover:bg-green-900/50 transition-colors"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
