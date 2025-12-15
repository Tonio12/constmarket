'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { ArtisanCard as ArtisanCardType } from '@/lib/types/artisan';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { requireAuth } from '@/lib/utils/auth';

interface ArtisanCardProps {
  artisan: ArtisanCardType;
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  const router = useRouter();

  const handleProtectedAction = (action: () => void) => {
    requireAuth(action, () => {
      toast.error('Sign in to continue');
      router.push('/signup');
    });
  };

  const openProfile = () => {
    handleProtectedAction(() => router.push(`/artisan/${artisan.id}`));
  };

  const promptContact = () => {
    handleProtectedAction(() => toast.success('Contact info will be provided after you sign in.'));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48 rounded-t-2xl overflow-hidden bg-gray-100">
        {artisan.profilePicture ? (
          <Image
            src={artisan.profilePicture}
            alt={artisan.name}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary to-blue-500" />
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <p className="font-semibold text-lg text-gray-900">{artisan.name}</p>
          <p className="text-sm text-gray-500">{artisan.specialty}</p>
          <p className="text-sm text-gray-500">{artisan.location}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Star className="w-4 h-4 text-amber-500" />
          <span>{artisan.rating.toFixed(1)}</span>
          <span className="text-gray-400">•</span>
          <span>{artisan.reviewCount} reviews</span>
        </div>
        {artisan.hourlyRate && (
          <div className="text-sm font-medium text-gray-900">
            {artisan.hourlyRate.currency} {artisan.hourlyRate.rate}/hr
          </div>
        )}
        <p className="text-sm text-gray-600">{artisan.bio}</p>
        <div className="flex gap-2 mt-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={openProfile}>
            View Profile
          </Button>
          <Button size="sm" className="flex-1" onClick={promptContact}>
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}

