import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Heart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm mt-0 pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--secondary-color,#F5C842)] rounded-lg flex items-center justify-center">
              <span className="text-[var(--primary-color,#2C3E50)] font-bold text-xl">M</span>
            </div>
            <span className="text-xl font-bold text-[var(--primary-color,#2C3E50)]">MythManga</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for anime merchandise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative"
              onClick={() => navigate('/wishlist')}
            >
              <Heart className="w-5 h-5 text-[var(--primary-color,#2C3E50)]" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5 text-[var(--primary-color,#2C3E50)]" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[var(--secondary-color,#F5C842)] text-[var(--primary-color,#2C3E50)] hover:bg-[var(--secondary-color,#F5C842)] px-1.5 py-0.5 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5 text-[var(--primary-color,#2C3E50)]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium text-[var(--primary-color,#2C3E50)]">
                      {user?.name}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      My Account
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                      Wishlist
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate('/admin')}>
                          Admin Dashboard
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/login')}>
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/signup')}>
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5 text-[var(--primary-color,#2C3E50)]" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  <form onSubmit={handleSearch} className="w-full">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                  <Link to="/catalog/figurines" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)]">
                    Figurines
                  </Link>
                  <Link to="/catalog/manga" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)]">
                    Manga
                  </Link>
                  <Link to="/catalog/posters" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)]">
                    Posters
                  </Link>
                  <Link to="/catalog/accessories" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)]">
                    Accessories
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Category Bar - Desktop */}
      <div className="hidden md:block border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 text-sm">
            <Link to="/catalog/figurines" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Figurines
            </Link>
            <Link to="/catalog/manga" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Manga
            </Link>
            <Link to="/catalog/posters" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Posters
            </Link>
            <Link to="/catalog/accessories" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Accessories
            </Link>
            <Link to="/catalog/tech-gadgets" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Tech Gadgets
            </Link>
            <Link to="/catalog/apparel" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Apparel
            </Link>
            <Link to="/catalog/mystery-boxes" className="text-[var(--primary-color,#2C3E50)] hover:text-[var(--secondary-color,#F5C842)] transition-colors">
              Mystery Boxes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}