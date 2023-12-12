import { PrismaClient } from '@prisma/client';
import seedCategories from './categories';

const prisma = new PrismaClient();

async function main() {
  await seedCategories(prisma);
}

main()
  .then(() => {
    console.info('# -------------------- #');
    console.info('# --- SEED SUCCESS --- #');
    console.info('# -------------------- #');
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
