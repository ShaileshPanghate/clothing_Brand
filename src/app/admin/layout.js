'use client';
import { usePathname } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-8">
                {children}
            </div>
        </div>
    );
}
