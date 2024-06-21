import TaskRepository, { NewTaskDTO, Task } from '@/repositories/TaskRepository';
import { ClientComponent } from './client';
import CategoryRepository from '@/repositories/CategoryRepository';
import PlayerRepository from '@/repositories/PlayerRepository';

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

async function togglePlayerInTask(playerNickname: string, taskId: number) {
  'use server';

  let [player, task] = await Promise.all([
    await PlayerRepository.findByName(playerNickname),
    await TaskRepository.findById(taskId),
  ]);

  if (!player) {
    player = await PlayerRepository.save({
      name: playerNickname,
    });
  }

  if (!task || !player) return;

  const taskPlayerIds = task.players.map((player) => player.id);
  const hasAlreadyPlayer = taskPlayerIds.find((pId) => pId === player.id);

  if (hasAlreadyPlayer) {
    return TaskRepository.updatePlayers(task.id, taskPlayerIds.filter((pId) => pId !== player.id));
  }

  return TaskRepository.updatePlayers(task.id, [...taskPlayerIds, player.id]);
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
        togglePlayerInTask={togglePlayerInTask}
      />
    </div>
  );
}
