import { makeSchema, objectType, queryType } from "nexus";
import { join } from "path";

const Artist = objectType({
  name: "Artist",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("url");
  },
});

const Album = objectType({
  name: "Album",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("year");
    t.field("artist", {
      type: "Artist",
      async resolve(album, _args, ctx) {
        const artist = await ctx.artistLoader.load(album.artistId);
        // const artist = await ctx.prisma.artist.findFirst({
        //   where: { id: album.artistId },
        // });
        return artist!;
      },
    });
  },
});

const Query = queryType({
  definition(t) {
    t.list.field("albums", {
      type: "Album",
      args: {
        first: "Int",
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.album.findMany({ take: args.first });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Artist, Album],
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    typegen: join(process.cwd(), "nexus.ts"),
  },
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "prisma" }],
    debug: process.env.NODE_ENV === "development",
  },
  contextType: {
    module: join(process.cwd(), "src", "context.ts"),
    export: "Context",
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
