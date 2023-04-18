import { Project } from "@/types/projects";
import { Page } from "@/types/page";
import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { SlugInput } from "sanity";

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            url,
            content
        }`
  );
}

export async function getProject(slug: string): Promise<Project> {
  const client = createClient({
    projectId: "wwtpjxbb",
    dataset: "production",
    apiVersion: "2023-04-11",
  });

  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
            _id,
            _createdAt,
            name,
            "slug": slug.current,
            "image": image.asset->url,
            url,
            content
        }`,
    { slug }
  );
}

export async function getPages(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page"] {
      _id,
      _createdAt,
      title,
      "slug": slug.current
    }`
  );
}

export async function getPage(slug: string): Promise<Page> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      content
    }`,
    { slug }
  );
}
