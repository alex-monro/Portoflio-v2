import type { Project } from "./projects";

const WP_URL = process.env.WORDPRESS_URL;

type WPProject = {
  slug: string;
  title: { rendered: string };
  acf: {
    tags: string[];
    thumbnail: string;
    video: string;
    overview: string;
    reflection: string;
    link: string;
    github: string;
    images: string[];
  };
};

function mapProject(wp: WPProject): Project {
  return {
    slug: wp.slug,
    title: wp.title.rendered,
    tags: wp.acf.tags ?? [],
    thumbnail: wp.acf.thumbnail ?? "",
    video: wp.acf.video ?? "",
    overview: wp.acf.overview ?? "",
    reflection: wp.acf.reflection ?? "",
    link: wp.acf.link ?? "",
    github: wp.acf.github ?? "",
    images: wp.acf.images ?? [],
  };
}

export async function getWPProjects(): Promise<Project[]> {
  const res = await fetch(
    `${WP_URL}/wp-json/wp/v2/project?per_page=100&_fields=slug,title,acf`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error(`WordPress fetch failed: ${res.status}`);
  const data: WPProject[] = await res.json();
  return data.map(mapProject);
}

export async function getWPProject(slug: string): Promise<Project | null> {
  const res = await fetch(
    `${WP_URL}/wp-json/wp/v2/project?slug=${slug}&_fields=slug,title,acf`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return null;
  const data: WPProject[] = await res.json();
  return data[0] ? mapProject(data[0]) : null;
}
