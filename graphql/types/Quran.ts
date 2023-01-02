import { verses, audio_files, reciters, reciter } from '@prisma/client';
import { extendType, intArg, objectType, queryType, stringArg } from 'nexus';

export const Audio = objectType({
  name: 'Audio',
  definition(t) {
    t.int('id');
    t.int('duration');
    t.int('verseId');
    t.int('recitationId');
    t.string('url');
  },
});

export const Reciter = objectType({
  name: 'Reciter',
  definition(t) {
    t.int('reciterId');
    t.string('english');
    t.string('arabic');
  },
});

export const Verses = objectType({
  name: 'Verse',
  definition(t) {
    t.int('id');
    t.int('chapterId');
    t.int('verseNumber');
    t.string('textUthmani');
    t.field('translation', {
      type: Audio,
      description: 'audio shit',
      args: {
        ids: intArg(),
      },
      async resolve(parent, args, ctx) {
        const prisma: audio_files = await ctx.prisma.audio_files.findFirst();
        console.log('111', args);
        return {
          id: prisma.id,
          duration: prisma.duration,
          verseId: prisma.verse_id,
          recitationId: prisma.recitation_id,
          url: prisma.url,
        };
      },
    });
    t.field('reciter', {
      type: Reciter,
      description: 'this shit is for reciter',
      args: {
        start: stringArg(),
        end: stringArg(),
      },
      async resolve(parent, args, ctx) {
        const prisma: reciter = await ctx.prisma.reciter.findFirst();
        console.log('args', args, parent);
        return {
          reciterId: prisma.reciter_id,
          english: prisma.english,
          arabic: prisma.arabic,
        };
      },
    });
  },
});

export const VerseQuery = queryType({
  definition(t) {
    t.field('verses', {
      type: Verses,
      args: {
        start: stringArg(),
        end: stringArg(),
      },
      resolve: async (_root, _args, ctx) => {
        const prisma: verses = await ctx.prisma.verses.findFirst();
        console.log('_args in query', _args);
        // const prisma = ctx.prisma.quran.findFirst(;
        const obj = {
          id: prisma.id,
          chapterId: prisma.chapter_id,
          verseNumber: prisma.verse_number,
          textUthmani: prisma.text_uthmani,
        };

        return obj;
      },
    });
  },
});

// export const QuranQuery = queryType({
//   definition(t) {
//     t.field('quran', {
//       type: Quran,
//       args: {
//         args1: stringArg(),
//         args2: stringArg(),
//       },
//       resolve: async (_root, _args, ctx) => {
//         // const prisma = ctx.prisma.quran.findFirst(;
//         return ;
//       },
//     });
//   },
// });

// export const Quran = objectType({
//   name: 'Quran',
//   definition(t) {
//     t.st;
//   },
// });
