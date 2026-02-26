import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const users = [
  {
    name: "Yahin Niel",
    email: "yahinnielvas@gmail.com",
    password: "Eminsa2024!",
    role: "admin",
  },
  {
    name: "Administrador EMINSA",
    email: "admin@eminsa.com",
    password: "Admin2024!",
    role: "admin",
  },
  {
    name: "Editor EMINSA",
    email: "editor@eminsa.com",
    password: "Editor2024!",
    role: "editor",
  },
];

async function main() {
  console.log("Seeding database...\n");

  for (const u of users) {
    const hashedPassword = hashSync(u.password, 10);
    const userId = randomUUID();
    const accountId = randomUUID();
    const now = new Date();

    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        updatedAt: now,
      },
      create: {
        id: userId,
        name: u.name,
        email: u.email,
        emailVerified: true,
        role: u.role,
        createdAt: now,
        updatedAt: now,
        accounts: {
          create: {
            id: accountId,
            accountId: u.email,
            providerId: "credential",
            password: hashedPassword,
            createdAt: now,
            updatedAt: now,
          },
        },
      },
    });

    // Always update the credential account password (fixes plain-text passwords from old seeds)
    await prisma.account.updateMany({
      where: { accountId: u.email, providerId: "credential" },
      data: { password: hashedPassword, updatedAt: now },
    });

    console.log(`✓ ${u.name} <${u.email}> [${u.role}] — password: ${u.password}`);
  }

  console.log("\nSeed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
