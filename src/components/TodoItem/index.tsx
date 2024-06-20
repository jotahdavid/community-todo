import { CheckIcon } from '@/components/Icons/CheckIcon';
import { Todo } from '@/repositories/TodoRepository';
import { cn } from '@/utils/cn';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <div
      className={cn(
        'flex w-full text-white rounded-sm p-5',
        { 'bg-green-dark': !todo.completed, 'bg-[#4F7C3B]': todo.completed },
      )}
    >
      <div className="flex-1">
        <div className="mb-4">
          <p className="text-lg flex items-center">
            <button className="size-4 mr-2 fill-white">
              <CheckIcon fill={todo.completed} />
            </button>
            <span className={cn({ 'line-through': todo.completed })}>
              {todo.title}
            </span>
          </p>

          <span className="text-green-400">
            * Criada por &quot;{todo.createdBy}&quot;
          </span>
        </div>

        <ul className="flex gap-4">
          {todo.categories.map((category) => (
            <li key={category.id} className="bg-green-400 rounded-sm p-1">
              # {category.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between">
        <strong className="text-base text-right">
          {todo.completed ? 'Ajudaram:' : 'Estão ajudando:'}
        </strong>

        <ul className="flex justify-end">
          {!todo.completed && (
            <li>
              <button className="bg-green-400 size-9 text-3xl leading-none flex items-center justify-center z-20 relative shadow-[2px_0_3.5px_rgb(0_0_0_/_50%)]">
                +
              </button>
            </li>
          )}
          {todo.users.map((user, index) => (
            <li key={user} className="-ml-1">
              <img
                className="size-9 relative shadow-[2px_0_3.5px_rgb(0_0_0_/_50%)]"
                style={{ zIndex: 10 - index }}
                src={`https://mineskin.eu/helm/${user}`}
                alt={`Avatar ${user}`}
                title={user}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
