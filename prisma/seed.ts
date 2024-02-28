import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
const prisma = new PrismaClient();

const rolesNames: string[] = [
  'ROLE_ADMIN',
  'ROLE_STAFF',
  'ROLE_USER',
  'ROLE_GUIDE',
  'ROLE_TOURIST',
];

const usersData = [
  {
    username: 'admin',
    hash: '12345678',
  },
];

async function main() {
  const rolesData = rolesNames.map((roleName) => ({
    roleName,
  }));
  await prisma.role.createMany({
    data: rolesData,
  });
  const hashedUsersData = await Promise.all(
    usersData.map(async (user) => {
      user.hash = await argon2.hash(user.hash);
      return user;
    }),
  );
  await prisma.user.createMany({
    data: hashedUsersData,
  });
  await prisma.user.update({
    where: { id: 1 },
    data: {
      roles: {
        connect: [{ id: 1 }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
