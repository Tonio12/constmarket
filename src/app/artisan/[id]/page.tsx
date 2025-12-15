import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import ContactCta from '@/components/artisan/ContactCta';
import type { ArtisanDetail } from '@/lib/types/artisan';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const fetchArtisan = async (id: string): Promise<ArtisanDetail | null> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/artisans/${id}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return null;
    }
    const payload = await response.json();
    return payload?.data ?? null;
  } catch (error) {
    console.error('Fetch artisan detail failed:', error);
    return null;
  }
};

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artisan = await fetchArtisan(id);
  if (!artisan) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 py-12 max-w-5xl mx-auto grid gap-10 lg:grid-cols-[280px_1fr]">
        <div className="rounded-3xl border border-gray-100 shadow-sm bg-white p-6 space-y-6">
          <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-gray-100">
            <Image
              fill
              src={artisan.profilePicture || '/hero.webp'}
              alt={artisan.name}
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 280px"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">Specialty</p>
            <p className="text-xl font-semibold">{artisan.specialty}</p>
          </div>
          <ContactCta artisan={artisan} />
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-base text-gray-900">{artisan.location}</p>
          </div>
          {artisan.hourlyRate && (
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Hourly Rate</p>
              <p className="text-base font-semibold text-gray-900">
                {artisan.hourlyRate.currency} {artisan.hourlyRate.rate}/hr
              </p>
            </div>
          )}
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Artisan Profile</p>
            <h1 className="text-3xl font-semibold text-gray-900">{artisan.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Star className="w-4 h-4 text-amber-500" />
              <span>{artisan.rating.toFixed(1)}</span>
              <span>•</span>
              <span>{artisan.reviewCount} reviews</span>
              <span>•</span>
              <span>{artisan.experience || 0} yrs experience</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {artisan.specialties.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 border border-gray-200 rounded-full text-xs font-medium text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <p className="text-gray-600">{artisan.bio}</p>
            </section>
            <section className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Email: {artisan.contactInfo?.email || 'Hidden until sign in'}</p>
                <p>Phone: {artisan.contactInfo?.phone || 'Hidden until sign in'}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

