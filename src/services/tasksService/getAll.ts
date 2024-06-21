import { Task } from '@/repositories/TaskRepository';


export async function getAll(): Promise<Task[]> {
  const response = await fetch('/tasks');
  const data = response.json();
  return data;
}
