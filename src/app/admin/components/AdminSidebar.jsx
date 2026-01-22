'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Products', href: '/admin/products', icon: '🛍️' },
        { name: 'Orders', href: '/admin/orders', icon: '📦' },
        { name: 'Users', href: '/admin/users', icon: '👥' },
        { name: 'Categories', href: '/admin/categories', icon: '🏷️' },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed left-0 top-0 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
                Admin Portal
            </h2>
            <nav className="space-y-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-800 text-gray-300'
                            }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}

                <button
                    onClick={() => {
                        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = '/admin/login';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900 text-red-300 mt-8 transition-colors text-left"
                >
                    <span className="text-xl">🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </nav>
        </div>
    );
}
