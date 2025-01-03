import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Correct import

export default function NotFoundPage() {
  const router = useRouter();

  // Redirect to the homepage or any other fallback page after a certain time
  useEffect(() => {
    setTimeout(() => {
      router.push('/'); // Redirect after 5 seconds
    }, 5000);
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-xl mt-4">Sorry, the page you are looking for does not exist.</p>
      <p className="mt-4">You will be redirected to the homepage in 5 seconds.</p>
    </div>
  );
}
