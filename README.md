Hi, I’m Hian, a Full Stack Junior Developer with experience in Java, C#, JavaScript, and PHP. I’ve also worked with AWS and Google Cloud services, including Compute Engine.
Additionally, I have UI/UX design skills using Figma.

I have 1 year of hands-on coding experience, working on various projects.
Passionate about creating efficient and user-friendly solutions!


--Aoshy Dev

---

## 🌐 Portfolio

Este repositorio también contiene mi página de portafolio, construida con:

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** con paleta inspirada en Discord (blurple, grises oscuros y morado)
- **Framer Motion** para las animaciones
- **Supabase** para el panel de administración (`/admin`)

### Ejecutar en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm start
```

### Panel admin (`/admin`)

El contenido (perfil, proyectos y experiencia) se puede editar desde `/admin`,
conectado a Supabase. Sin configurar Supabase, la web funciona igual con el
contenido por defecto de `lib/data.ts`.

Para activarlo:

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ejecuta `supabase/schema.sql` en el SQL Editor.
3. Crea tu usuario admin en **Authentication → Users**.
4. Copia `.env.example` a `.env.local` y rellena las variables (y añádelas
   también en Vercel → Settings → Environment Variables).

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
