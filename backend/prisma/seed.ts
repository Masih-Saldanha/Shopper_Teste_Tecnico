import prisma from "./../src/config/database.js";

async function main() {
  console.log("Running Seed...");

  const users = [
    { name: "Diego Pinho" },
    { name: "Bruna Hamori" },
    { name: "Maria Fernanda" }
  ]

  await prisma.users.createMany({
    data: users,
    skipDuplicates: true
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})