'use client';

import { FormEvent, useState } from 'react';

interface AddUsernameModalProps {
  onSubmit?: (nickname: string) => Promise<void>;
}

interface InputError {
  message: string;
}

export function AddUsernameModal({ onSubmit }: AddUsernameModalProps) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<InputError | null>(null);

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setError(null);
    setNickname(event.currentTarget.value.replaceAll(' ', ''));
  };

  const handleSubmit = () => {
    if (nickname.length < 2) {
      setError({
        message: 'Insira um nickname de no mínimo 2 caracteres.',
      });
      return;
    }

    if (nickname.length > 16) {
      setError({
        message: 'Insira um nickname de no máximo 16 caracteres.',
      });
      return;
    }

    setError(null);
    onSubmit?.(nickname);
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4">
      <div className="max-w-[1000px] w-11/12 bg-green-light shadow-lg p-10 rounded-sm flex flex-col justify-center my-auto">
        <h2 className="font-vt323 text-8xl text-center mb-1">
          Qual seu nick?
        </h2>

        <p className="lowercase text-center text-2xl mb-9">
          Digite o mesmo nome que você utiliza no minecraft
        </p>

        <div className="mb-10 w-11/12 mx-auto">
          <input
            className="text-5xl p-4 block w-full bg-[#6AA84F] outline-none border-2 border-transparent focus-within:border-green-dark transition-colors mb-1"
            type="text"
            name="nickname"
            value={nickname}
            onInput={handleInput}
          />

          {error && (
            <span className="text-red-600 font-bold text-lg">
              {error.message}
            </span>
          )}
        </div>

        <button
          className="font-vt323 text-4xl w-fit bg-green-dark py-2 px-8 rounded-sm hover:bg-green-900 transition-colors mx-auto"
          type="button"
          onClick={handleSubmit}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
