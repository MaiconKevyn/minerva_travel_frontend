
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Airplane, Flower } from './DecorativeElements.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import ThemeToggle from '@/components/ThemeToggle.jsx';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/pricing', label: 'Preços' },
    { path: '/create', label: 'Criar Guia' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">

          {/* Logo with Decorative Element */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Airplane className="w-8 h-8 text-secondary" />
              <Flower className="absolute -bottom-2 -right-2 w-6 h-6 text-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-serif font-bold text-foreground tracking-tight hidden sm:block">
              Aventuras em <span className="text-primary">Família</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="w-px h-8 bg-border/60 mx-2"></div>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-2">
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground">
                    <User className="w-4 h-4" />
                  </div>
                  {user?.name || user?.email?.split('@')[0]}
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="rounded-full font-medium hover:bg-destructive/10 hover:text-destructive">
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Button variant="ghost" asChild className="rounded-full font-medium">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="rounded-full bg-secondary hover:bg-secondary/90 text-white">
                  <Link to="/signup">Criar Conta</Link>
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-foreground/80 hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 absolute top-20 left-0 w-full bg-background border-b border-border shadow-lg px-4 space-y-4 pb-6">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-5 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px w-full bg-border"></div>

            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-5 py-3 rounded-2xl text-base font-medium bg-accent/10 text-accent-foreground"
                >
                  Meu Painel
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-5 py-3 rounded-2xl text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  Sair da Conta
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-5 py-3 rounded-2xl text-base font-medium text-center border-2 border-border"
                >
                  Entrar
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-5 py-3 rounded-2xl text-base font-bold text-center bg-secondary text-white"
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
