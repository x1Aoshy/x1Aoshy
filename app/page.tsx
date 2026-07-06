import Portfolio from "@/components/Portfolio";
import { getContent } from "@/lib/content";

// Revalida cada 60s para reflejar cambios hechos desde /admin
export const revalidate = 60;

export default async function Home() {
  const content = await getContent();

  return <Portfolio content={content} />;
}
