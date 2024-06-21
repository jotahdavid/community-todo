import TaskRepository, { NewTaskDTO, Task } from '@/repositories/TaskRepository';
import { ClientComponent } from './client';
import CategoryRepository from '@/repositories/CategoryRepository';

async function saveTask(newTask: NewTaskDTO) {
  'use server';

  return TaskRepository.save(newTask);
}

async function toggleTaskStatus(taskId: number) {
  'use server';

  const task = await TaskRepository.findById(taskId);

  if (!task) return;

  return TaskRepository.update(task.id, {
    ...task,
    completed: !task.completed,
  });
}

export default async function Home() {
  const tasks = await TaskRepository.getAll();
  const categories = await CategoryRepository.getAll();

  return (
    <div className="h-[100vh] text-white flex overflow-hidden">
      <ClientComponent
        initialTasks={tasks}
        categories={categories}
        saveTask={saveTask}
        toggleTaskStatus={toggleTaskStatus}
      />
    </div>
  );
}
