import { getSupabase } from "./supabase";
import {
  defaultExperience,
  defaultExperienceEn,
  defaultProfile,
  defaultProfileEn,
  defaultProjects,
  defaultProjectsEn,
  type ExperienceItem,
  type Profile,
  type Project,
} from "./data";
import type { Lang } from "./i18n";

export type SiteContent = {
  profile: Profile;
  projects: Project[];
  experience: ExperienceItem[];
};

export type LocalizedContent = Record<Lang, SiteContent>;

const defaults: LocalizedContent = {
  es: {
    profile: defaultProfile,
    projects: defaultProjects,
    experience: defaultExperience,
  },
  en: {
    profile: defaultProfileEn,
    projects: defaultProjectsEn,
    experience: defaultExperienceEn,
  },
};

// Carga el contenido desde Supabase; si no está configurado o falla,
// usa el contenido por defecto de lib/data.ts (en ambos idiomas).
// El contenido editado desde /admin se muestra tal cual en los dos idiomas.
export async function getContent(): Promise<LocalizedContent> {
  const supabase = getSupabase();
  if (!supabase) return defaults;

  try {
    const [profileRes, projectsRes, experienceRes] = await Promise.all([
      supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("experience").select("*").order("sort_order"),
    ]);

    const buildProfile = (fallback: Profile): Profile =>
      profileRes.data
        ? {
            name: profileRes.data.name || fallback.name,
            roles: profileRes.data.roles?.length
              ? profileRes.data.roles
              : fallback.roles,
            bio: profileRes.data.bio || fallback.bio,
            email: profileRes.data.email || fallback.email,
            github: profileRes.data.github || fallback.github,
            available: profileRes.data.available ?? fallback.available,
          }
        : fallback;

    const build = (lang: Lang): SiteContent => ({
      profile: buildProfile(defaults[lang].profile),
      projects: projectsRes.data?.length
        ? projectsRes.data
        : defaults[lang].projects,
      experience: experienceRes.data?.length
        ? experienceRes.data
        : defaults[lang].experience,
    });

    return { es: build("es"), en: build("en") };
  } catch {
    return defaults;
  }
}
