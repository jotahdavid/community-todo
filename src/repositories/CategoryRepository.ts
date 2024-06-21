import prisma from '@/services/prisma';

class CategoryRepository {
  async getAll() {
    return prisma.category.findMany();
  }
}

export default new CategoryRepository();
