"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";
import type { ExperienceItem, Profile, Project } from "@/lib/data";
import { defaultProfile } from "@/lib/data";

type Tab = "perfil" | "proyectos" | "experiencia";

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
  return (
    <div className="mx-auto max-w-2xl px-5 py-24">
      <span className="section-tag">Admin</span>
      <h1 className="section-title">Supabase no está configurado</h1>
      <p className="mb-6 text-ink-300">
        Para usar el panel de administración, crea un proyecto en{" "}
        <a
          href="https://supabase.com"
          className="text-blurple-light hover:text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          supabase.com
        </a>{" "}
        y sigue estos pasos:
      </p>
      <ol className="list-decimal space-y-4 pl-5 text-sm leading-relaxed text-ink-200">
        <li>
          Ejecuta el contenido de{" "}
          <code className="rounded border border-ink-700 bg-ink-900 px-1.5 py-0.5 font-mono text-xs">
            supabase/schema.sql
          </code>{" "}
          en el SQL Editor de tu proyecto.
        </li>
        <li>
          En <strong className="text-white">Authentication → Users</strong>,
          crea tu usuario admin (email + contraseña).
        </li>
        <li>
          Define estas variables de entorno (en Vercel y en{" "}
          <code className="rounded border border-ink-700 bg-ink-900 px-1.5 py-0.5 font-mono text-xs">
            .env.local
          </code>
          ):
          <pre className="mt-2 overflow-x-auto rounded-md border border-ink-700 bg-ink-900 p-3 font-mono text-xs text-ink-200">
            {`NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key`}
          </pre>
        </li>
        <li>Redeploya y vuelve a esta página para iniciar sesión.</li>
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
    if (error) setError("Credenciales incorrectas. Inténtalo de nuevo.");
    else onDone();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-lg border border-ink-700 bg-ink-900 p-6 sm:p-8"
      >
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-ink-700 bg-ink-950 font-mono text-xs font-semibold text-blurple-light">
            HC
          </span>
          <div>
            <p className="text-sm font-medium text-white">Panel admin</p>
            <p className="text-xs text-ink-400">hian.dev</p>
          </div>
        </div>

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input mb-4"
          placeholder="tu@email.com"
        />

        <label className="label" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
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
          {loading ? "Entrando…" : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}

// ---------- formulario: perfil ----------

function ProfileForm() {
  const supabase = getSupabase()!;
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
          <label className="label">Nombre</label>
          <input
            className="input"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Email de contacto</label>
          <input
            className="input"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="label">Roles (separados por coma, rotan en el hero)</label>
        <input
          className="input"
          value={rolesText}
          onChange={(e) => setRolesText(e.target.value)}
          placeholder="Full Stack Developer, Cloud Enthusiast"
        />
      </div>

      <div>
        <label className="label">Bio</label>
        <textarea
          className="input min-h-28 resize-y"
          rows={4}
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
      </div>

      <div>
        <label className="label">GitHub (URL)</label>
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
        Disponible para nuevos proyectos
      </label>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "saving"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "saving" ? "Guardando…" : "Guardar perfil"}
        </button>
        {status === "ok" && <Notice kind="ok">Guardado ✓</Notice>}
        {status === "error" && (
          <Notice kind="error">Error al guardar. Revisa la consola.</Notice>
        )}
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
    type: "text" | "textarea" | "tags";
    span?: boolean;
  }[];
  titleField: keyof T & string;
}) {
  const supabase = getSupabase()!;
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

  if (loading) return <p className="text-sm text-ink-400">Cargando…</p>;

  return (
    <div className="space-y-4">
      {status === "error" && (
        <Notice kind="error">Error al guardar. Revisa la consola.</Notice>
      )}

      {items.map((item, index) => (
        <details
          key={item.id ?? `new-${index}`}
          className="group rounded-lg border border-ink-700 bg-ink-950"
          open={!item.id}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
            <span className="text-sm font-medium text-white">
              {(item[titleField] as string) || "Nuevo elemento"}
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
                Guardar
              </button>
              <button
                type="button"
                onClick={() => deleteItem(item)}
                className="rounded-md border border-red-500/40 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                Eliminar
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
        + Añadir
      </button>
    </div>
  );
}

// ---------- página ----------

export default function AdminPage() {
  const supabase = getSupabase();
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
    { id: "perfil", label: "Perfil" },
    { id: "proyectos", label: "Proyectos" },
    { id: "experiencia", label: "Experiencia" },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded border border-ink-700 bg-ink-900 font-mono text-[11px] font-semibold text-blurple-light">
              HC
            </span>
            <span className="text-sm font-medium text-white">Panel admin</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="rounded-md px-3 py-1.5 text-[13px] text-ink-300 transition-colors hover:text-white"
            >
              Ver web
            </a>
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-md border border-ink-700 px-3 py-1.5 text-[13px] text-ink-200 transition-colors hover:border-ink-500 hover:text-white"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8">
        <nav className="mb-8 flex gap-1 overflow-x-auto rounded-lg border border-ink-700 bg-ink-900 p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-ink-950 text-white"
                  : "text-ink-400 hover:text-ink-200"
              }`}
            >
              {t.label}
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
            }}
            fields={[
              { key: "title", label: "Título", type: "text" },
              { key: "url", label: "URL de la demo", type: "text" },
              { key: "repo", label: "URL del repositorio", type: "text" },
              { key: "tags", label: "Tags", type: "tags" },
              {
                key: "description",
                label: "Descripción",
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
              { key: "title", label: "Título", type: "text" },
              { key: "period", label: "Periodo (ej. 2025 — Presente)", type: "text" },
              { key: "place", label: "Lugar / empresa", type: "text" },
              { key: "tags", label: "Tags", type: "tags" },
              {
                key: "description",
                label: "Descripción",
                type: "textarea",
                span: true,
              },
            ]}
          />
        )}

        <p className="mt-10 text-center font-mono text-xs text-ink-500">
          Los cambios se reflejan en la web en ~1 minuto (revalidación).
        </p>
      </main>
    </div>
  );
}
