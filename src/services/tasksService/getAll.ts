import { Task } from '@/repositories/TaskRepository';

export async function getAll(): Promise<Task[]> {
  const response = await fetch('/tasks', { cache: 'no-store' });
  const data = response.json();
  return data;
}
