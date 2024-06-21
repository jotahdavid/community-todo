import TaskRepository from '@/repositories/TaskRepository';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tasks = await TaskRepository.getAll();
  return Response.json(tasks);
}
