import { z } from "astro:content";
import type { SchemaContext } from "astro:content";
import type { ZodType } from "astro:schema";

export type Site = {
  NAME: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_WORKS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  HREF: string;
}[];

type ZodSchemaType<T> = NonNullable<
  Exclude<T, (context: SchemaContext) => unknown>
>;

export type InferZodSchema<T extends ZodType> = z.infer<ZodSchemaType<T>>;
