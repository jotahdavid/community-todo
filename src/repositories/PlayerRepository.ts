import prisma from '@/services/prisma';

export interface NewPlayerDTO {
  name: string;
}

class PlayerRepository {
  async findById(playerId: number) {
    return prisma.player.findUnique({
      where: {
        id: playerId,
      }
    });
  }

  async findByName(playerNickname: string) {
    return prisma.player.findFirst({
      where: {
        name: playerNickname,
      }
    });
  }

  async save({ name }: NewPlayerDTO) {
    return prisma.player.create({
      data: {
        name,
      },
    });
  }
}

export default new PlayerRepository();
