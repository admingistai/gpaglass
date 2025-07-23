'use client';

import { AskWidget } from '@/components/AskWidget';

export default function Home() {
  const handleWidgetClick = () => {
    console.log('Ask widget clicked!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-[#666666] flex items-center justify-center p-4">
      <AskWidget onClick={handleWidgetClick} />
    </main>
  );
}
