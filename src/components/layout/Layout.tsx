
import React from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen w-full bg-background flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        !isMobile && !sidebarOpen ? "ml-20" : "",
        !isMobile && sidebarOpen ? "ml-64" : "ml-0",
      )}>
        {isMobile && <MobileMenu open={sidebarOpen} setOpen={setSidebarOpen} />}
        <main className={cn(
          "flex-1 min-h-screen p-6 md:p-8 animate-fade-in",
          isMobile ? "pt-20" : "",
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
