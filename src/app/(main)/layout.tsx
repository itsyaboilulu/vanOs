'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Power, Gauge, List, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Dashboard', icon: Gauge },
    { href: '/sensors', label: 'Sensors', icon: List },
    { href: '/optimize', label: 'Optimize', icon: Wrench },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-2 font-headline font-bold text-lg"
          >
            <Power className="h-6 w-6 text-primary" />
            <span>VoltVision</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    link.href === '/'
                      ? pathname === link.href
                      : pathname.startsWith(link.href)
                  }
                  tooltip={link.label}
                >
                  <Link href={link.href}>
                    <link.icon />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
