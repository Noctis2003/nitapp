import { redirect } from 'next/navigation';
import {cookies} from 'next/headers';
export default async function Page() {
const cookieStore = cookies();
  const token =  (await cookieStore).get('accessToken')?.value;

  if (!token) {
    redirect('/api/auth/refresh'); // Will refresh and redirect back
  }

  // Proceed normally
  return <div>Your protected content</div>;
}
