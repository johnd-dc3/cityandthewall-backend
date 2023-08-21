import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();
async function main() {
  // Create methods for user
  // This query will NOT create the user if it already exists
  // If the user exists, it will update it
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {},
    create: {
      email: 'sabin@adams.com',
      name: 'Sabine Adams',
      password: 'password-sabin',
    },
  });

  // console.log('Upserted User:', user1);

  // Note that running this query multiple times will result in error, as email as a @unique constraint
  // const newUser = await prisma.user.create({
  //   data: {
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: 'password123',
  //   },
  // });

  // console.log('Created user:', newUser);

  // Update user
  const updatedUser = await prisma.user.update({
    where: { email: 'johndoe@example.com' },
    data: {
      name: 'Updated Name',
    },
  });

  console.log('Updated User:', updatedUser);

  // Read user by ID
  const userById = await prisma.user.findUnique({
    where: { email: 'johndoe@example.com' }, // Id of newUser above
  });

  // Delete user
  const deletedUser = await prisma.user.delete({
    where: { email: 'johndoe@example.com' },
  });

  // console.log('Deleted user:', deletedUser);

  // create dummy post
  const post1 = await prisma.post.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: 1,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: 1,
    },
  });

  // console.log('Post 1:', post1);
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
