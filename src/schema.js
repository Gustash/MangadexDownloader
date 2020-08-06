/**
 * @format
 * @flow strict-local
 */
import type {ObjectSchema} from 'realm';

const MangaSchema: ObjectSchema = {
  name: 'Manga',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    cover_url: 'string',
    chapters: 'Chapter[]',
  },
};

const ChapterSchema: ObjectSchema = {
  name: 'Chapter',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    group_name: 'string',
    chapter: 'int',
    volume: 'int?',
    manga: 'Manga',
  },
};

const schema: [ObjectSchema] = [MangaSchema, ChapterSchema];

export default schema;
