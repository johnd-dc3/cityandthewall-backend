import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();
async function main() {
  const categoriesToCreate = [
    { name: 'Random' },
    { name: 'Leisure' },
    { name: 'Kid Stuff' },
    { name: 'Travel' },
    // Add more category objects as needed
  ];

  const createdCategories = await Promise.all(
    categoriesToCreate.map((categoryData) =>
      prisma.category.upsert({
        where: { name: categoryData.name },
        update: {},
        create: categoryData,
      }),
    ),
  );

  await prisma.post.upsert({
    where: { title: 'test post 1' },
    update: {
      authorId: 1,
      categories: {
        connect: [{ name: 'Travel' }],
      },
    },
    create: {
      title: 'test post 1',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: true,
      categories: {
        connect: [{ name: 'Travel' }],
      },
      authorId: 1,
    },
    include: {
      categories: true,
    },
  });

  const allUsers = await prisma.post.findMany({
    include: {
      categories: true,
    },
  });
  console.log(allUsers);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
