import type { Metadata } from 'next';
import Sidebar from './_components/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard — EcoCapture Solutions',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
