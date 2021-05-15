import { PrismaClient } from "@prisma/client";
import { Artist } from ".prisma/client";
import DataLoader from "dataloader";

const prisma = new PrismaClient({ log: ["query"] });

const createArtistLoader = () =>
  new DataLoader<number, Artist | null>(async (ids) => {
    const artists = await prisma.artist.findMany({
      where: { id: { in: [...ids] } },
    });

    const artistMap = artists.reduce(
      (acc, artist) => acc.set(artist.id, artist),
      new Map<number, Artist>()
    );

    return ids.map((id) => artistMap.get(id) ?? null);
  });

export interface Context {
  prisma: PrismaClient;
  artistLoader: ReturnType<typeof createArtistLoader>;
}

export function context(): Context {
  return { prisma, artistLoader: createArtistLoader() };
}
