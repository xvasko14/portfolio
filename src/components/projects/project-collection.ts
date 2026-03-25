import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;
export type ProjectData = ProjectEntry["data"];
export type ProjectStatus = ProjectData["status"];

export async function getSortedProjects() {
  const projects = await getCollection("projects");

  return projects.sort((a, b) => {
    if (a.data.featured !== b.data.featured) {
      return Number(b.data.featured) - Number(a.data.featured);
    }

    return b.data.year - a.data.year;
  });
}
