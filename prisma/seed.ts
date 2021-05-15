import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const comeback = await prisma.artist.create({
    data: {
      name: "Comeback Kid",
      url: "https://comeback-kid.com/",
      albums: {
        create: [
          { name: "Turn It Around", year: "2003" },
          { name: "Wake the Dead", year: "2005" },
        ],
      },
    },
  });
  console.log({ comeback });

  const sleeping = await prisma.artist.create({
    data: {
      name: "Sleeping Giant",
      url: "https://www.facebook.com/sleepinggiant",
      albums: {
        create: [
          { name: "I Am", year: "2018" },
          { name: "Finished People", year: "2014" },
          { name: "Kingdom Days in an Evil Age", year: "2009" },
          { name: "Sons of Thunder", year: "2009" },
          { name: "Dread Champions of the Last Days", year: "2007" },
        ],
      },
    },
  });
  console.log({ sleeping });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
