import { redirect } from 'next/navigation';

export default async function Page() {
  const cookies = require('next/headers').cookies();
  const token = cookies.get('accessToken');

  if (!token) {
    redirect('/api/auth/refresh'); // Will refresh and redirect back
  }

  // Proceed normally
  return <div>Your protected content</div>;
}
