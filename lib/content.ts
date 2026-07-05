import { getSupabase } from "./supabase";
import {
  defaultExperience,
  defaultProfile,
  defaultProjects,
  type ExperienceItem,
  type Profile,
  type Project,
} from "./data";

export type SiteContent = {
  profile: Profile;
  projects: Project[];
  experience: ExperienceItem[];
};

// Carga el contenido desde Supabase; si no está configurado o falla,
// usa el contenido por defecto de lib/data.ts.
export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      profile: defaultProfile,
      projects: defaultProjects,
      experience: defaultExperience,
    };
  }

  try {
    const [profileRes, projectsRes, experienceRes] = await Promise.all([
      supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("experience").select("*").order("sort_order"),
    ]);

    const profile: Profile = profileRes.data
      ? {
          name: profileRes.data.name || defaultProfile.name,
          roles: profileRes.data.roles?.length
            ? profileRes.data.roles
            : defaultProfile.roles,
          bio: profileRes.data.bio || defaultProfile.bio,
          email: profileRes.data.email || defaultProfile.email,
          github: profileRes.data.github || defaultProfile.github,
          available: profileRes.data.available ?? defaultProfile.available,
        }
      : defaultProfile;

    return {
      profile,
      projects: projectsRes.data?.length ? projectsRes.data : defaultProjects,
      experience: experienceRes.data?.length
        ? experienceRes.data
        : defaultExperience,
    };
  } catch {
    return {
      profile: defaultProfile,
      projects: defaultProjects,
      experience: defaultExperience,
    };
  }
}
