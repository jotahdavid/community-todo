import TodoRepository from '@/repositories/TodoRepository';
import { ClientComponent } from './client';

export default async function Home() {
  const todos = await TodoRepository.getAll();

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="h-[100vh] text-white flex overflow-hidden">
      <ClientComponent
        pendingTodos={pendingTodos}
        completedTodos={completedTodos}
      />
    </div>
  );
}
