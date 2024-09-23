import type { Site, Metadata, Socials } from "@types";

import ReactIcon from "@components/Icons/ReactIcon.astro";
import GsapIcon from "@components/Icons/GsapIcon.astro";
import VtexIcon from "@components/Icons/VtexIcon.astro";
import NodeJsIcon from "@components/Icons/NodeJsIcon.astro";
import PhpIcon from "@components/Icons/PhpIcon.astro";
import JavaScriptIcon from "@components/Icons/JavaScriptIcon.astro";
import TypeScriptIcon from "@components/Icons/TypeScriptIcon.astro";
import WordpressIcon from "@components/Icons/WordpressIcon.astro";
import GraphQLIcon from "@components/Icons/GraphQLIcon.astro";

export const SITE: Site = {
  NAME: "M.Bronca",
  EMAIL: "dev@matheusbronca.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 4,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION:
    "An experienced software developer, with a vast history of creating, executing, and leading the development of software solutions that boost business growth all around the globe.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  // {
  //   NAME: "twitter-x",
  //   HREF: "https://twitter.com/markhorn_dev",
  // },
  {
    NAME: "github",
    HREF: "https://github.com/matheusbronca",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/matheus-bronca",
  },
];

export const STACKS = {
  REACT: {
    friendlyName: "React",
    altText: "Reactive UI library for JavaScript",
    url: "https://react.dev",
    Icon: ReactIcon,
  },
  VTEX: {
    friendlyName: "VTEX IO",
    altText: "Modern VTEX framework to build e-commerces",
    url: "https://vtex.com ",
    Icon: VtexIcon,
  },
  GSAP: {
    friendlyName: "GSAP",
    altText: "GreenSock Animation Platform - A javascript animation library",
    url: "https://gsap.com",
    Icon: GsapIcon,
  },
  NODEJS: {
    friendlyName: "Node.js",
    url: "https://nodejs.org/",
    altText:
      "Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.",
    Icon: NodeJsIcon,
  },
  PHP: {
    friendlyName: "Php",
    url: "https://www.php.net/",
    altText:
      "PHP is a general-purpose scripting language geared towards web development",
    Icon: PhpIcon,
  },
  JAVASCRIPT: {
    friendlyName: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    altText:
      "JavaScript, often abbreviated as JS, is a programming language and core technology of the Web ",
    Icon: JavaScriptIcon,
  },
  TYPESCRIPT: {
    friendlyName: "TypeScript",
    url: "https://www.typescriptlang.org/",
    altText:
      "TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript",
    Icon: TypeScriptIcon,
  },
  WORDPRESS: {
    friendlyName: "WordPress",
    url: "https://wordpress.com/",
    altText:
      "WordPress is a web content management system. It was originally created as a tool to publish blogs but has evolved to support publishing other web content",
    Icon: WordpressIcon,
  },
  GRAPHQL: {
    friendlyName: "GraphQL",
    url: "https://graphql.org/",
    altText:
      "GraphQL is a data query and manipulation language for APIs, that allows a client to specify what data it needs",
    Icon: GraphQLIcon,
  },
} as const;
