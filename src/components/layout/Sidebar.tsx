
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Plus, 
  DollarSign, 
  PieChart, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const sidebarLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Transactions', path: '/transactions', icon: <DollarSign className="h-5 w-5" /> },
    { name: 'Categories', path: '/categories', icon: <PieChart className="h-5 w-5" /> },
    { name: 'Budget', path: '/budget', icon: <Plus className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const ThemeIcon = React.useMemo(() => {
    if (theme === 'system') return Laptop;
    return theme === 'dark' ? Moon : Sun;
  }, [theme]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-sidebar dark:bg-gray-900 shadow-medium transition-all duration-300 ease-in-out",
          open ? "w-64" : "w-20",
          isMobile && !open && "-translate-x-full w-64",
          "flex flex-col",
          "border-r border-border dark:border-gray-800"
        )}
      >
        <div className={cn(
          "flex items-center h-16 px-4",
          open ? "justify-between" : "justify-center"
        )}>
          {open && (
            <div className="flex items-center pl-2">
              <Home className="h-5 w-5 text-primary mr-2" />
              <span className="text-lg font-semibold">FinanceTrack</span>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full"
            onClick={toggleSidebar}
          >
            {open ? 
              <ChevronLeft className="h-5 w-5" /> : 
              <ChevronRight className="h-5 w-5" />
            }
          </Button>
        </div>

        <ScrollArea className="flex-1 pt-4">
          <div className="flex flex-col gap-1 px-2">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  "hover:bg-secondary/80 group",
                  location.pathname === link.path 
                    ? "bg-secondary text-primary font-medium dark:bg-gray-800 dark:text-white" 
                    : "dark:hover:bg-gray-800/80",
                  !open && "justify-center px-0"
                )}
              >
                <span className="flex items-center justify-center">
                  {React.cloneElement(link.icon, {
                    className: cn(
                      "h-5 w-5",
                      location.pathname === link.path 
                        ? "text-primary dark:text-white" 
                        : "text-muted-foreground group-hover:text-foreground dark:group-hover:text-gray-300"
                    )
                  })}
                </span>
                {open && (
                  <span className="ml-3 text-sm">{link.name}</span>
                )}
              </Link>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 mt-auto flex flex-col gap-2">
          {open && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between"
                >
                  <div className="flex items-center">
                    <ThemeIcon className="h-4 w-4 mr-2" />
                    <span>Theme</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          <Button
            variant="ghost"
            className={cn(
              "w-full text-muted-foreground border border-border rounded-lg hover:bg-secondary/80 flex items-center",
              "dark:hover:bg-gray-800 dark:border-gray-700",
              !open && "justify-center p-2"
            )}
          >
            <LogOut className="h-4 w-4" />
            {open && <span className="ml-2 text-sm">Sign Out</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
