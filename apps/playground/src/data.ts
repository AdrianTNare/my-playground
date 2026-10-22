export interface StackGroup {
  k: string;
  items: string[];
}

export const stack: StackGroup[] = [
  {
    k: "front-end",
    items: ["React · Next.js · Svelte", "MUI · Chakra · Tailwind"],
  },
  { k: "back-end", items: ["Node.js · Express", "GraphQL · Spring Boot"] },
  { k: "testing / ci", items: ["Vitest · RTL", "Git · Docker"] },
];
