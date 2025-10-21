import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, Star, Hammer, HardHat, Paintbrush, Wrench, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-6xl mx-auto">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Find Skilled Construction Workers & Artisans
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Connect with trusted foremen, masons, carpenters, electricians, and more. Hire the best
            talent for your next project.
          </p>
          <Button size="lg" className="text-lg" asChild>
            <a href="/signup">Get Started</a>
          </Button>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/hero.webp"
            alt="Construction Hero"
            width={480}
            height={320}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <CheckCircle className="mx-auto text-green-500" size={40} />
              <h3 className="font-semibold mt-4">Post a Project</h3>
              <p className="text-gray-600">
                Describe your construction needs and post your project.
              </p>
            </div>
            <div>
              <Users className="mx-auto text-green-500" size={40} />
              <h3 className="font-semibold mt-4">Browse Talent</h3>
              <p className="text-gray-600">
                Search and filter skilled laborers and artisans by specialty.
              </p>
            </div>
            <div>
              <Star className="mx-auto text-green-500" size={40} />
              <h3 className="font-semibold mt-4">Hire & Rate</h3>
              <p className="text-gray-600">Connect, hire, and rate your team with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-12 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="flex flex-col items-center">
            <Hammer size={36} className="text-blue-600" />
            <span className="mt-2 font-medium">Masons</span>
          </div>
          <div className="flex flex-col items-center">
            <HardHat size={36} className="text-yellow-600" />
            <span className="mt-2 font-medium">Foremen</span>
          </div>
          <div className="flex flex-col items-center">
            <Wrench size={36} className="text-gray-700" />
            <span className="mt-2 font-medium">Plumbers</span>
          </div>
          <div className="flex flex-col items-center">
            <Zap size={36} className="text-green-600" />
            <span className="mt-2 font-medium">Electricians</span>
          </div>
          <div className="flex flex-col items-center">
            <Paintbrush size={36} className="text-pink-600" />
            <span className="mt-2 font-medium">Painters</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <CheckCircle className="mx-auto text-green-500" size={40} />
              <h3 className="font-semibold mt-4">Verified Talent</h3>
              <p className="text-gray-600">All workers are vetted and rated by real clients.</p>
            </div>
            <div>
              <Users className="mx-auto text-green-500" size={40} />
              <h3 className="font-semibold mt-4">Easy Hiring</h3>
              <p className="text-gray-600">Quickly find and hire the right people for your job.</p>
            </div>
            <div>
              <Star className="mx-auto text-green-500" size={40} />
              <h3 className="font-semibold mt-4">Transparent Ratings</h3>
              <p className="text-gray-600">See honest reviews and ratings before you hire.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Image
                src="/user1.jpg"
                alt="User 1"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">Ayo Contractor</p>
                <p className="text-sm text-gray-500">Contractor</p>
              </div>
            </div>
            <p className="text-gray-700">
              “This platform made it so easy to find reliable workers for my project. Highly
              recommended!”
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <Image
                src="/user2.jpg"
                alt="User 2"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="ml-4">
                <p className="font-semibold">Chinedu Foreman</p>
                <p className="text-sm text-gray-500">Foreman</p>
              </div>
            </div>
            <p className="text-gray-700">
              “I found more jobs and got paid on time. The rating system is fair and transparent.”
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 text-lg">Join now and connect with the best construction talent.</p>
        <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
          <a href="/signup">Sign Up</a>
        </Button>
      </section>
    </main>
  );
}
