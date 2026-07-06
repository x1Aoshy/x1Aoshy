"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";
import type { ExperienceItem, Profile, Project } from "@/lib/data";
import { defaultProfile } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";

type Tab = "perfil" | "proyectos" | "experiencia";

// ---------- textos ES/EN del panel ----------

const copy = {
  es: {
    tabs: { perfil: "Perfil", proyectos: "Proyectos", experiencia: "Experiencia" },
    panel: "Panel admin",
    viewSite: "Ver web",
    signOut: "Salir",
    footer: "Los cambios se reflejan en la web en ~1 minuto (revalidación).",
    loading: "Cargando…",
    newItem: "Nuevo elemento",
    save: "Guardar",
    delete: "Eliminar",
    add: "+ Añadir",
    saved: "Guardado ✓",
    saveError: "Error al guardar. Revisa la consola.",
    profile: {
      name: "Nombre",
      email: "Email de contacto",
      roles: "Roles (separados por coma, rotan en el hero)",
      rolesPh: "Full Stack Developer, Cloud Enthusiast",
      bio: "Bio",
      github: "GitHub (URL)",
      available: "Disponible para nuevos proyectos",
      save: "Guardar perfil",
      saving: "Guardando…",
    },
    project: {
      title: "Título",
      url: "URL de la demo",
      repo: "URL del repositorio",
      tags: "Tags",
      desc: "Descripción",
      media: "Foto / video (se muestra al hacer hover en la tarjeta)",
    },
    media: {
      urlPh: "https://… (o sube un archivo)",
      upload: "Subir archivo",
      uploading: "Subiendo…",
      remove: "Quitar",
      error:
        "Error al subir. ¿Ejecutaste el SQL del bucket \"media\"? Revisa la consola.",
    },
    exp: {
      title: "Título",
      period: "Periodo (ej. 2025 — Presente)",
      place: "Lugar / empresa",
      tags: "Tags",
      desc: "Descripción",
    },
    setup: {
      title: "Supabase no está configurado",
      intro: "Para usar el panel de administración, crea un proyecto en",
      andFollow: "y sigue estos pasos:",
      step1a: "Ejecuta el contenido de",
      step1b: "en el SQL Editor de tu proyecto.",
      step2a: "En",
      step2b: "Authentication → Users",
      step2c: ", crea tu usuario admin (email + contraseña).",
      step3a: "Define estas variables de entorno (en Vercel y en",
      step3b: "):",
      step4: "Redeploya y vuelve a esta página para iniciar sesión.",
    },
  },
  en: {
    tabs: { perfil: "Profile", proyectos: "Projects", experiencia: "Experience" },
    panel: "Admin panel",
    viewSite: "View site",
    signOut: "Sign out",
    footer: "Changes show up on the site in ~1 minute (revalidation).",
    loading: "Loading…",
    newItem: "New item",
    save: "Save",
    delete: "Delete",
    add: "+ Add",
    saved: "Saved ✓",
    saveError: "Error while saving. Check the console.",
    profile: {
      name: "Name",
      email: "Contact email",
      roles: "Roles (comma separated, rotate in the hero)",
      rolesPh: "Full Stack Developer, Cloud Enthusiast",
      bio: "Bio",
      github: "GitHub (URL)",
      available: "Available for new projects",
      save: "Save profile",
      saving: "Saving…",
    },
    project: {
      title: "Title",
      url: "Demo URL",
      repo: "Repository URL",
      tags: "Tags",
      desc: "Description",
      media: "Photo / video (shown when hovering the card)",
    },
    media: {
      urlPh: "https://… (or upload a file)",
      upload: "Upload file",
      uploading: "Uploading…",
      remove: "Remove",
      error:
        "Upload failed. Did you run the \"media\" bucket SQL? Check the console.",
    },
    exp: {
      title: "Title",
      period: "Period (e.g. 2025 — Present)",
      place: "Place / company",
      tags: "Tags",
      desc: "Description",
    },
    setup: {
      title: "Supabase is not configured",
      intro: "To use the admin panel, create a project at",
      andFollow: "and follow these steps:",
      step1a: "Run the contents of",
      step1b: "in your project's SQL Editor.",
      step2a: "In",
      step2b: "Authentication → Users",
      step2c: ", create your admin user (email + password).",
      step3a: "Set these environment variables (on Vercel and in",
      step3b: "):",
      step4: "Redeploy and come back to this page to sign in.",
    },
  },
} as const;

// ---------- utilidades ----------

function tagsToText(tags: string[] | null | undefined): string {
  return (tags ?? []).join(", ");
}

function textToTags(text: string): string[] {
  return text
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|#|$)/i.test(url);
}

function Notice({
  kind,
  children,
}: {
  kind: "ok" | "error";
  children: React.ReactNode;
}) {
  return (
    <p
      className={`rounded-md border px-3 py-2 text-sm ${
        kind === "ok"
          ? "border-green-500/40 bg-green-500/10 text-green-400"
          : "border-red-500/40 bg-red-500/10 text-red-400"
      }`}
    >
      {children}
    </p>
  );
}

// ---------- pantalla: Supabase sin configurar ----------

function SetupGuide() {
  const { lang } = useI18n();
  const t = copy[lang].setup;
  return (
    <div className="mx-auto max-w-2xl px-5 py-24">
      <div className="mb-4 flex items-center justify-between">
        <span className="section-tag !mb-0">Admin</span>
        <LangSwitch />
      </div>
      <h1 className="section-title">{t.title}</h1>
      <p className="mb-6 text-ink-300">
        {t.intro}{" "}
        <a
          href="https://supabase.com"
          className="text-blurple-light hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          supabase.com
        </a>{" "}
        {t.andFollow}
      </p>
      <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-ink-200">
        <li>
          {t.step1a}{" "}
          <code className="rounded border border-ink-700 bg-ink-900 px-1.5 py-0.5 font-mono text-xs">
            supabase/schema.sql
          </code>{" "}
          {t.step1b}
        </li>
        <li>
          {t.step2a} <strong className="text-white">{t.step2b}</strong>
          {t.step2c}
        </li>
        <li>
          {t.step3a}{" "}
          <code className="rounded border border-ink-700 bg-ink-900 px-1.5 py-0.5 font-mono text-xs">
            .env.local
          </code>
          {t.step3b}
          <pre className="mt-2 overflow-x-auto rounded-md border border-ink-700 bg-ink-900 p-3 font-mono text-xs text-ink-200">
            {`NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key`}
          </pre>
        </li>
        <li>{t.step4}</li>
      </ol>
    </div>
  );
}

// ---------- pantalla: login ----------

function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await getSupabase()!.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError("Incorrect credentials. Please try again.");
    else onDone();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-lg border border-ink-700 bg-ink-900 p-6 sm:p-8"
      >
        <span className="section-tag">Login</span>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mb-6 mt-1 text-sm text-ink-400">Sign in to continue</p>

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input mb-4"
          placeholder="you@email.com"
        />

        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mb-5"
          placeholder="••••••••"
        />

        {error && (
          <div className="mb-4">
            <Notice kind="error">{error}</Notice>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

// ---------- campo: subir foto/video a Supabase Storage ----------

function MediaField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const { lang } = useI18n();
  const t = copy[lang].media;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    // try/catch + finally: pase lo que pase, el botón se libera y
    // el motivo real del fallo se muestra en rojo
    try {
      const supabase = getSupabase()!;
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `projects/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, { cacheControl: "3600" });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      console.error(err);
      const detail = err instanceof Error ? err.message : String(err);
      setError(`${t.error} (${detail})`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.urlPh}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="btn-secondary shrink-0 !px-4 !py-2 text-xs disabled:opacity-60"
        >
          {uploading ? t.uploading : t.upload}
        </button>
      </div>

      {error && <Notice kind="error">{error}</Notice>}

      {value && (
        <div className="flex items-center gap-3">
          <div className="h-16 w-28 shrink-0 overflow-hidden rounded border border-ink-700 bg-ink-950">
            {isVideoUrl(value) ? (
              <video
                src={value}
                className="h-full w-full object-cover"
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md border border-ink-700 px-3 py-1.5 text-xs text-ink-300 transition-colors hover:border-ink-500 hover:text-white"
          >
            {t.remove}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- formulario: perfil ----------

function ProfileForm() {
  const supabase = getSupabase()!;
  const { lang } = useI18n();
  const t = copy[lang];
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [rolesText, setRolesText] = useState(defaultProfile.roles.join(", "));
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">(
    "idle",
  );

  useEffect(() => {
    supabase
      .from("profile")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile({ ...defaultProfile, ...data });
          setRolesText(tagsToText(data.roles));
        }
      });
  }, [supabase]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const { error } = await supabase.from("profile").upsert({
      id: 1,
      name: profile.name,
      roles: textToTags(rolesText),
      bio: profile.bio,
      email: profile.email,
      github: profile.github,
      available: profile.available,
      updated_at: new Date().toISOString(),
    });
    setStatus(error ? "error" : "ok");
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">{t.profile.name}</label>
          <input
            className="input"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{t.profile.email}</label>
          <input
            className="input"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">{t.profile.roles}</label>
        <input
          className="input"
          value={rolesText}
          onChange={(e) => setRolesText(e.target.value)}
          placeholder={t.profile.rolesPh}
        />
      </div>

      <div>
        <label className="label">{t.profile.bio}</label>
        <textarea
          className="input min-h-28 resize-y"
          rows={4}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
      </div>

      <div>
        <label className="label">{t.profile.github}</label>
        <input
          className="input"
          value={profile.github}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-md border border-ink-700 bg-ink-950 px-3 py-2.5 text-sm text-ink-200">
        <input
          type="checkbox"
          checked={profile.available}
          onChange={(e) =>
            setProfile({ ...profile, available: e.target.checked })
          }
          className="h-4 w-4 accent-blurple"
        />
        {t.profile.available}
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "saving"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "saving" ? t.profile.saving : t.profile.save}
        </button>
        {status === "ok" && <Notice kind="ok">{t.saved}</Notice>}
        {status === "error" && <Notice kind="error">{t.saveError}</Notice>}
      </div>
    </form>
  );
}

// ---------- editor genérico de listas (proyectos / experiencia) ----------

type ListItem = Record<string, unknown> & { id?: string };

function ListEditor<T extends ListItem>({
  table,
  emptyItem,
  fields,
  titleField,
}: {
  table: "projects" | "experience";
  emptyItem: T;
  fields: {
    key: keyof T & string;
    label: string;
    type: "text" | "textarea" | "tags" | "media";
    span?: boolean;
  }[];
  titleField: keyof T & string;
}) {
  const supabase = getSupabase()!;
  const { lang } = useI18n();
  const t = copy[lang];
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("");

  const load = useCallback(async () => {
    const { data } = await supabase.from(table).select("*").order("sort_order");
    setItems((data as T[]) ?? []);
    setLoading(false);
  }, [supabase, table]);

  useEffect(() => {
    load();
  }, [load]);

  function update(index: number, key: string, value: unknown) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  }

  async function saveItem(item: T, index: number) {
    setStatus("saving");
    const payload = { ...item, sort_order: index };
    const { error } = item.id
      ? await supabase.from(table).update(payload).eq("id", item.id)
      : await supabase.from(table).insert(payload);
    if (!error) await load();
    setStatus(error ? "error" : "ok");
  }

  async function deleteItem(item: T) {
    if (!item.id) {
      setItems((prev) => prev.filter((i) => i !== item));
      return;
    }
    setStatus("saving");
    const { error } = await supabase.from(table).delete().eq("id", item.id);
    if (!error) await load();
    setStatus(error ? "error" : "ok");
  }

  if (loading) return <p className="text-sm text-ink-400">{t.loading}</p>;

  return (
    <div className="space-y-4">
      {status === "error" && <Notice kind="error">{t.saveError}</Notice>}

      {items.map((item, index) => (
        <details
          key={item.id ?? `new-${index}`}
          className="group rounded-lg border border-ink-700 bg-ink-950"
          open={!item.id}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-white">
              {(item[titleField] as string) || t.newItem}
            </span>
            <span className="font-mono text-xs text-ink-500 transition-transform group-open:rotate-90">
              ›
            </span>
          </summary>

          <div className="grid gap-4 border-t border-ink-700 p-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.span ? "sm:col-span-2" : undefined}
              >
                <label className="label">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    className="input min-h-20 resize-y"
                    rows={3}
                    value={(item[field.key] as string) ?? ""}
                    onChange={(e) => update(index, field.key, e.target.value)}
                  />
                ) : field.type === "tags" ? (
                  <input
                    className="input"
                    value={tagsToText(item[field.key] as string[])}
                    onChange={(e) =>
                      update(index, field.key, textToTags(e.target.value))
                    }
                    placeholder="tag1, tag2, tag3"
                  />
                ) : field.type === "media" ? (
                  <MediaField
                    value={(item[field.key] as string) ?? ""}
                    onChange={(url) => update(index, field.key, url)}
                  />
                ) : (
                  <input
                    className="input"
                    value={(item[field.key] as string) ?? ""}
                    onChange={(e) => update(index, field.key, e.target.value)}
                  />
                )}
              </div>
            ))}

            <div className="flex gap-3 sm:col-span-2">
              <button
                type="button"
                onClick={() => saveItem(item, index)}
                disabled={status === "saving"}
                className="btn-primary !px-4 !py-2 text-xs disabled:opacity-60"
              >
                {t.save}
              </button>
              <button
                type="button"
                onClick={() => deleteItem(item)}
                className="rounded-md border border-red-500/40 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </details>
      ))}

      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { ...emptyItem }])}
        className="btn-secondary w-full border-dashed"
      >
        {t.add}
      </button>
    </div>
  );
}

// ---------- página ----------

export default function AdminPage() {
  const supabase = getSupabase();
  const { lang } = useI18n();
  const t = copy[lang];
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState<Tab>("perfil");

  useEffect(() => {
    if (!supabase) {
      setChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  if (!supabase) return <SetupGuide />;
  if (!checked) return null;
  if (!session) return <Login onDone={() => {}} />;

  const tabs: { id: Tab; label: string }[] = [
    { id: "perfil", label: t.tabs.perfil },
    { id: "proyectos", label: t.tabs.proyectos },
    { id: "experiencia", label: t.tabs.experiencia },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-[11px] font-semibold text-blurple-light">
              HC
            </span>
            <span className="text-sm font-medium text-white">{t.panel}</span>
          </div>
          <div className="flex items-center gap-2">
            <LangSwitch />
            <a
              href="/"
              className="rounded-md px-3 py-1.5 text-[13px] text-ink-300 transition-colors hover:text-white"
            >
              {t.viewSite}
            </a>
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-md border border-ink-700 px-3 py-1.5 text-[13px] text-ink-200 transition-colors hover:border-ink-500 hover:text-white"
            >
              {t.signOut}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8">
        <nav className="mb-8 flex gap-1 overflow-x-auto rounded-lg border border-ink-700 bg-ink-900 p-1">
          {tabs.map((tabDef) => (
            <button
              key={tabDef.id}
              onClick={() => setTab(tabDef.id)}
              className={`flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === tabDef.id
                  ? "bg-ink-950 text-white"
                  : "text-ink-400 hover:text-ink-200"
              }`}
            >
              {tabDef.label}
            </button>
          ))}
        </nav>

        {tab === "perfil" && <ProfileForm />}

        {tab === "proyectos" && (
          <ListEditor<Project>
            table="projects"
            titleField="title"
            emptyItem={{
              title: "",
              description: "",
              tags: [],
              url: "",
              repo: "",
              media_url: "",
            }}
            fields={[
              { key: "title", label: t.project.title, type: "text" },
              { key: "url", label: t.project.url, type: "text" },
              { key: "repo", label: t.project.repo, type: "text" },
              { key: "tags", label: t.project.tags, type: "tags" },
              {
                key: "media_url",
                label: t.project.media,
                type: "media",
                span: true,
              },
              {
                key: "description",
                label: t.project.desc,
                type: "textarea",
                span: true,
              },
            ]}
          />
        )}

        {tab === "experiencia" && (
          <ListEditor<ExperienceItem>
            table="experience"
            titleField="title"
            emptyItem={{
              period: "",
              title: "",
              place: "",
              description: "",
              tags: [],
            }}
            fields={[
              { key: "title", label: t.exp.title, type: "text" },
              { key: "period", label: t.exp.period, type: "text" },
              { key: "place", label: t.exp.place, type: "text" },
              { key: "tags", label: t.exp.tags, type: "tags" },
              {
                key: "description",
                label: t.exp.desc,
                type: "textarea",
                span: true,
              },
            ]}
          />
        )}

        <p className="mt-10 text-center font-mono text-xs text-ink-500">
          {t.footer}
        </p>
      </main>
    </div>
  );
}
