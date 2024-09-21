import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    cover: z.string(),
    galleryImgs: z.array(
      z.object({
        src: z.string(),
        mobileSrc: z.string().optional(),
        altText: z.string().optional(),
      }),
    ),
  }),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    imgAlt: z.string(),
    imgSrc: z.string(),
    url: z.string().url(),
    company: z.string(),
    role: z.string(),
    dateStart: z.coerce.date(),
    dateEnd: z.union([z.coerce.date(), z.string()]),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    customer: z.string(),
    description: z.string(),
    stack: z
      .enum([
        "REACT",
        "VTEX",
        "GSAP",
        "NODEJS",
        "PHP",
        "JAVASCRIPT",
        "TYPESCRIPT",
        "WORDPRESS",
        "GRAPHQL",
      ])
      .array()
      .optional(),
    thumbnailImg: z.object({
      url: z.string(),
      altText: z.string(),
    }),
    sliderImgs: z
      .object({
        src: z.string(),
        mobileSrc: z.string().optional(),
        altText: z.string().optional(),
      })
      .array()
      .optional(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    demoURL: z.string().optional(),
    repoURL: z.string().optional(),
  }),
});

export const collections = { blog, work, projects };
