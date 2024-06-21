'use client';

import { useState } from 'react';

interface AddUsernameModalProps {
  onSubmit?: (nickname: string) => Promise<void>;
}

export function AddUsernameModal({ onSubmit }: AddUsernameModalProps) {
  const [nickname, setNickname] = useState('');

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4">
      <div className="max-w-[1000px] w-11/12 bg-green-light shadow-lg p-10 rounded-sm flex flex-col justify-center my-auto">
        <h2 className="font-vt323 text-8xl text-center mb-1">
          Qual seu nick?
        </h2>

        <p className="lowercase text-center text-2xl mb-9">
          Digite o mesmo nome que você utiliza no minecraft
        </p>

        <input
          className="text-5xl p-4 block w-11/12 mx-auto bg-[#6AA84F] outline-none border-2 border-transparent focus-within:border-green-dark transition-colors mb-10"
          type="text"
          name="nickname"
          onInput={(e) => setNickname(e.currentTarget.value)}
        />

        <button
          className="font-vt323 text-4xl w-fit bg-green-dark py-2 px-8 rounded-sm hover:bg-green-900 transition-colors mx-auto"
          type="button"
          onClick={() => onSubmit?.(nickname)}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
