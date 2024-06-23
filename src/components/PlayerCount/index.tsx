import { useEffect, useRef, useState } from 'react';

import { UserIcon } from '@/components/Icons/UserIcon';
import { serverStatsService } from '@/services/serverStatsService';
import { TriangleExclamationIcon } from '@/components/Icons/TriangleExclamationIcon';
import { Spinner } from '../Spinner';

interface Player {
  uuid: string;
  name: string;
}

export function PlayerCount() {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [hasError, setHasError] = useState(false);
  const lastFetchTime = useRef(new Date());

  async function refreshServerStats() {
    try {
      setIsLoading(true);
      const serverStats = await serverStatsService.get();

      if (!serverStats?.online) {
        setHasError(true);
        return;
      }

      setPlayers(serverStats.players.list);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
      lastFetchTime.current = new Date();
    }
  }

  useEffect(() => {
    refreshServerStats();

    const handleVisibilityChange = () => {
      const timeDifference = (new Date().getTime() - lastFetchTime.current.getTime()) / 60 / 100;
      if (document.hidden || timeDifference <= 5) return;
      refreshServerStats();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {isLoading && <Spinner size="md" />}

      {(!isLoading && hasError) && (
        <span className="font-vt323 text-3xl uppercase flex items-center gap-x-3 mb-2">
          Server offline

          <TriangleExclamationIcon className="size-5 fill-red-600" />
        </span>
      )}

      {(!isLoading && !hasError) && (
        <>
          <span className="font-vt323 text-3xl uppercase flex items-center gap-x-3 mb-2">
            Jogadores online

            <UserIcon className="size-5 fill-green-light" />
          </span>

          <span className="group font-vt323 text-3xl bg-green-light py-1 px-5 rounded-sm relative">
            {String(players.length).padStart(2, '0')}

            <ul className="hidden group-hover:block absolute top-3/4 left-1/2 -translate-x-1/2 bg-white text-black px-4 rounded-sm max-h-[180px] overflow-y-auto">
              {players.map((player) => (
                <li key={player.uuid} className="text-xl py-1 flex items-center justify-center gap-x-1">
                  <img
                    className="size-3"
                    src={`https://mineskin.eu/helm/${player.name}`}
                    alt={`Avatar ${player.name}`}
                  />

                  {player.name}
                </li>
              ))}
            </ul>
          </span>
        </>
      )}
    </div>
  );
}
