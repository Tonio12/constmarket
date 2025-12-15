'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { ArtisanDetail } from '@/lib/types/artisan';
import { requireAuth } from '@/lib/utils/auth';

interface ContactCtaProps {
  artisan: ArtisanDetail;
}

export default function ContactCta({ artisan }: ContactCtaProps) {
  const router = useRouter();

  const handleContact = () => {
    requireAuth(
      () => {
        toast.success(
          `Email: ${artisan.contactInfo?.email || 'N/A'} • Phone: ${
            artisan.contactInfo?.phone || 'N/A'
          }`
        );
      },
      () => {
        toast.error('Sign in to view contact information');
        router.push('/signup');
      }
    );
  };

  return (
    <Button className="w-full" onClick={handleContact}>
      Contact Artisan
    </Button>
  );
}

