'use client';

import { useMemo, useState } from 'react';
import ArtisanCard from '@/components/artisan/ArtisanCard';
import type { ArtisanCard as ArtisanCardType } from '@/lib/types/artisan';
import { Button } from '@/components/ui/button';

interface ArtisanExplorerProps {
  artisans: ArtisanCardType[];
}

export default function ArtisanExplorer({ artisans }: ArtisanExplorerProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const specialties = useMemo(() => {
    const unique = Array.from(new Set(artisans.map((artisan) => artisan.specialty)));
    return ['all', ...unique];
  }, [artisans]);

  const filtered = useMemo(() => {
    if (selectedSpecialty === 'all') {
      return artisans;
    }
    return artisans.filter((artisan) => artisan.specialty === selectedSpecialty);
  }, [artisans, selectedSpecialty]);

  const grouped = useMemo(() => {
    const groups: Record<string, ArtisanCardType[]> = {};
    filtered.forEach((artisan) => {
      if (!groups[artisan.specialty]) {
        groups[artisan.specialty] = [];
      }
      groups[artisan.specialty].push(artisan);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-100">
      <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-gray-200 mb-6">
        {specialties.map((specialty) => (
          <button
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`px-4 py-2 rounded-full border ${
              selectedSpecialty === specialty
                ? 'border-primary bg-primary text-white'
                : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
            } transition`}
          >
            {specialty === 'all' ? 'All specialties' : specialty}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([specialty, artisansForSpecialty]) => (
        <div key={specialty} className="mb-10 last:mb-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-lg font-semibold text-gray-900 capitalize">{specialty}</p>
              <p className="text-sm text-gray-500">{artisansForSpecialty.length} artisans</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => setSelectedSpecialty(specialty)}
            >
              View {specialty}
            </Button>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {artisansForSpecialty.slice(0, 4).map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500">No artisans found for this specialty yet.</p>
      )}
    </div>
  );
}

