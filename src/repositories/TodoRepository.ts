import { Task as PrismaTask } from '@prisma/client';

import prisma from '@/services/prisma';

export interface NewTodoDTO {
  title: string;
  categories: number[];
  createdBy: string;
}

export type Task = Awaited<ReturnType<TodoRepository['getAll']>>[0];

class TodoRepository {
  async getAll() {
    return prisma.task.findMany({
      include: {
        players: true,
        author: true,
        categories: true,
      },
    });
  }

  async save(newTodo: NewTodoDTO): Promise<PrismaTask> {
    const author = await prisma.player.findFirst({
      where: {
        name: newTodo.createdBy,
      },
    });

    let authorId = author?.id;

    if (!author) {
      const newAuthor = await prisma.player.create({
        data: {
          name: newTodo.createdBy,
        },
      });
      authorId = newAuthor.id;
    }

    return prisma.task.create({
      data: {
        title: newTodo.title,
        completed: false,
        authorId: authorId!,
        categories: {
          connect: newTodo.categories.map((categoryId) => ({
            id: categoryId,
          })),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}

export default new TodoRepository();
