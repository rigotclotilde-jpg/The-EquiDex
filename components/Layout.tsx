
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './Button';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { label: 'Annuaire', path: '/directory' },
        { label: 'Blog', path: '/blog' },
        { label: 'Fidélité', path: '/loyalty' },
        { label: 'Contact', path: '/contact' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white font-serif text-black">
            {/* Header - White with border */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center z-50 hover:opacity-90 transition-opacity">
                        {/* Logo CSS reconstruction based on "The EquiDex" brand identity */}
                        <div className="bg-black text-white px-4 py-2">
                             <span className="font-serif text-xl md:text-2xl tracking-[0.15em] leading-none">THE EQUIDEX</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path}
                                className={`text-xs uppercase tracking-[0.15em] font-medium hover:text-equidex-gold transition-colors py-2 ${location.pathname === link.path ? 'text-equidex-gold border-b-2 border-equidex-gold' : 'text-black'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        <Link to="/auth">
                            <Button variant="primary" className="ml-2 !py-2 !px-5 !text-xs">Connexion</Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden z-50 text-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Mobile Nav Overlay */}
                    <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl uppercase tracking-widest font-serif text-black hover:text-equidex-gold"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                            <Button variant="primary">Connexion</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer - Black & Gold */}
            <footer className="bg-black text-gray-300 py-16 border-t border-gray-900">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            {/* Footer Logo: Gold Background, White Text */}
                            <div className="bg-equidex-gold text-white px-3 py-2">
                                <span className="font-serif text-lg tracking-[0.15em] leading-none">THE EQUIDEX</span>
                            </div>
                        </div>
                        <p className="mb-6 text-sm leading-relaxed text-gray-400 font-light">
                            L'excellence au service de la passion équestre. 
                            Votre partenaire de confiance pour l'équitation de luxe.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-equidex-gold transition-colors transform hover:scale-110 duration-300"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-equidex-gold transition-colors transform hover:scale-110 duration-300"><Facebook size={20} /></a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-equidex-gold font-serif uppercase tracking-widest text-sm font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-equidex-gold" />
                                12 Rue du Galop, 75008 Paris
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-equidex-gold" />
                                contact@equidex.fr
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-equidex-gold" />
                                +33 1 23 45 67 89
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-equidex-gold font-serif uppercase tracking-widest text-sm font-bold mb-6">Informations</h4>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link to="/mentions-legales" className="hover:text-equidex-gold transition-colors">Mentions Légales</Link></li>
                            <li><Link to="/cgv" className="hover:text-equidex-gold transition-colors">CGV</Link></li>
                            <li><Link to="/politique-confidentialite" className="hover:text-equidex-gold transition-colors">Politique de Confidentialité</Link></li>
                            <li><Link to="/faq" className="hover:text-equidex-gold transition-colors">FAQ</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-900 text-center text-xs text-gray-600 uppercase tracking-wide">
                    <p>© 2025 The EquiDex. Un Héritage d'Excellence.</p>
                </div>
            </footer>
        </div>
    );
};
