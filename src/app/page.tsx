import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import LandingNav from '@/components/landing/LandingNav';
import ArtisanExplorer from '@/components/landing/ArtisanExplorer';
import type { ArtisanCard } from '@/lib/types/artisan';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const fetchArtisans = async (): Promise<ArtisanCard[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/artisans?limit=15`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return [];
    }
    const payload = await response.json();
    return payload?.data ?? [];
  } catch (error) {
    console.error('Error fetching artisans:', error);
    return [];
  }
};

const heroImages = ['/hero.webp', '/hero-2.webp', '/hero-3.webp'];

export default async function Home() {
  const artisans = await fetchArtisans();

  return (
    <main className="min-h-screen bg-white">
      <LandingNav />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/40 to-transparent" />
        <div className="relative px-6 py-16 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 text-center lg:text-left">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">CraftConnect</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Discover trusted construction artisans across Ghana
            </h1>
            <p className="text-lg text-white/80 mt-4">
              Browse verified professionals, compare rates, and book with confidence. Profiles are
              visible before you sign in, but booking requires an account.
            </p>
            <div className="bg-white rounded-full flex items-center px-4 py-2 mt-6 shadow-lg">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by specialty, city, or skill"
                className="flex-1 border-0 outline-none text-sm text-gray-800"
              />
              <Button size="sm" className="rounded-full px-6 py-2">
                Search
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-wrap gap-4 justify-center">
            {heroImages.map((src) => (
              <div key={src} className="w-44 h-32 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={src}
                  alt="Workshop"
                  width={176}
                  height={128}
                  className="object-cover h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-2 mb-6">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-400">Featured Artisans</p>
            <h2 className="text-3xl font-semibold text-gray-900">Meet builders you can trust</h2>
            <p className="text-gray-600 max-w-2xl">
              Browse top-rated artisans across masonry, plumbing, electrical, and more. Sign in to
              unlock contact details and start hiring.
            </p>
          </div>
          <ArtisanExplorer artisans={artisans} />
        </div>
      </section>
    </main>
  );
}
