import { randomUUID } from 'crypto';

export interface Category {
  id: string;
  name: string;
}

export interface Todo {
  id: string;
  title: string;
  createdBy: string;
  categories: Category[];
  users: string[];
  completed: boolean;
}

class TodoRepository {
  async getAll(): Promise<Todo[]> {
    return [
      {
        id: randomUUID(),
        title: 'Tarefa 1',
        createdBy: 'Fulano',
        completed: false,
        categories: [
          { id: randomUUID(), name: 'Automação' }
        ],
        users: ['Monerk'],
      },
      {
        id: randomUUID(),
        title: 'Tarefa 2',
        createdBy: 'Fulano',
        completed: false,
        categories: [],
        users: ['lreporta'],
      },
      {
        id: randomUUID(),
        title: 'Tarefa concluida',
        createdBy: 'Beltrano',
        completed: true,
        categories: [],
        users: ['VenomExtreme', 'Feromonas'],
      },
    ];
  }
}

export default new TodoRepository();
