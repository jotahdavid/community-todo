import TodoRepository, { NewTodoDTO } from '@/repositories/TodoRepository';
import { ClientComponent } from './client';
import CategoryRepository from '@/repositories/CategoryRepository';

async function saveTodo(newTodo: NewTodoDTO) {
  'use server';

  return TodoRepository.save(newTodo);
}

export default async function Home() {
  const todos = await TodoRepository.getAll();
  const categories = await CategoryRepository.getAll();

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="h-[100vh] text-white flex overflow-hidden">
      <ClientComponent
        categories={categories}
        pendingTodos={pendingTodos}
        completedTodos={completedTodos}
        saveTodo={saveTodo}
      />
    </div>
  );
}
