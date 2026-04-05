// src/app/[locale]/(main)/[...notFound]/page.tsx

import { notFound, redirect } from 'next/navigation';

export default function Page() {
  notFound();
}
