import TaskRepository, { NewTaskDTO } from '@/repositories/TaskRepository';
import { ClientComponent } from './client';
import CategoryRepository from '@/repositories/CategoryRepository';

async function saveTask(newTask: NewTaskDTO) {
  'use server';

  return TaskRepository.save(newTask);
}

export default async function Home() {
  const tasks = await TaskRepository.getAll();
  const categories = await CategoryRepository.getAll();

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="h-[100vh] text-white flex overflow-hidden">
      <ClientComponent
        categories={categories}
        pendingTasks={pendingTasks}
        completedTasks={completedTasks}
        saveTask={saveTask}
      />
    </div>
  );
}
