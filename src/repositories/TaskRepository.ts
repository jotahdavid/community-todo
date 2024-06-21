import { Task as PrismaTask } from '@prisma/client';

import prisma from '@/services/prisma';

export interface NewTaskDTO {
  title: string;
  categories: number[];
  createdBy: string;
}

export type Task = Awaited<ReturnType<TaskRepository['getAll']>>[0];

class TaskRepository {
  async getAll() {
    return prisma.task.findMany({
      include: {
        players: true,
        author: true,
        categories: true,
      },
    });
  }

  async save(newTask: NewTaskDTO): Promise<PrismaTask> {
    const author = await prisma.player.findFirst({
      where: {
        name: newTask.createdBy,
      },
    });

    let authorId = author?.id;

    if (!author) {
      const newAuthor = await prisma.player.create({
        data: {
          name: newTask.createdBy,
        },
      });
      authorId = newAuthor.id;
    }

    return prisma.task.create({
      data: {
        title: newTask.title,
        completed: false,
        authorId: authorId!,
        categories: {
          connect: newTask.categories.map((categoryId) => ({
            id: categoryId,
          })),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

export default new TaskRepository();
