// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy posts
  const post1 = await prisma.post.upsert({
    where: { title: 'Ibaraki Ken Space Center' },
    update: {},
    create: {
      title: 'Ibaraki Ken Space Center',
      body: 'rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ni',
      description:
        "The Ibaraki Ken space center boasts an impressive collection for rockets and aerospace items from Japan's space program",
      published: false,
    },
  });

  // const john = await prisma.user.upsert({
  //   where: { email: 'justjohnd@gamil.com' },
  //   update: {},
  //   create: {
  //     email: 'justjohnd@gmail.com',
  //     name: 'John',
  //   },
  // });

  const travel = await prisma.category.upsert({
    where: { name: 'Travel' },
    update: {},
    create: {
      name: 'Travel',
    },
  });

  console.log({ travel });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
