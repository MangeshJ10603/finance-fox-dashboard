
import React from 'react';
import { Menu, Sun, Moon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, setOpen }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const ThemeIcon = React.useMemo(() => {
    if (theme === 'system') return Laptop;
    return theme === 'dark' ? Moon : Sun;
  }, [theme]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-border dark:border-gray-800 flex items-center justify-between px-4">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setOpen(!open)}
        className="h-9 w-9"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation</span>
      </Button>
      
      <h1 className="text-lg font-semibold">FinanceTrack</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
          >
            <ThemeIcon className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
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
    </div>
  );
};

export default MobileMenu;
