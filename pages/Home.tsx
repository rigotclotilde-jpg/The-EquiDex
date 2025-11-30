
import React, { useRef } from 'react';
import { ArrowRight, Star, ShoppingBag, BookOpen, Map as MapIcon, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../data/mockData';

export const Home: React.FC = () => {
    // Logic for the News Slider
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350; // Card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Get latest 6 posts sorted by ID descending (assuming higher ID = newer)
    const latestPosts = Object.values(BLOG_POSTS_DATA)
        .sort((a, b) => Number(b.id) - Number(a.id))
        .slice(0, 6);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 overflow-hidden">
                    {/* CHANGEMENT D'IMAGE ICI : Photo d'un cheval noir élégant */}
                    <img 
                        src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1920&auto=format&fit=crop"
                        alt="Cheval au galop" 
                        className="w-full h-full object-cover filter brightness-50"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                <div className="relative z-10 px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight animate-fade-in">
                        The EquiDex
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 font-light text-gray-200 max-w-2xl mx-auto">
                        L'excellence au service de la passion équestre.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/directory">
                            <Button variant="primary" className="w-full sm:w-auto text-lg py-3 px-8">
                                Explorer l'Annuaire
                            </Button>
                        </Link>
                        <Link to="/jobs">
                            <Button variant="outline" className="w-full sm:w-auto text-lg py-3 px-8">
                                Découvrir les offres d'emplois
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Poles */}
            <section className="py-20 bg-white z-10 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-equidex-dark mb-4">Nos Univers</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon={<MapIcon size={32} />}
                            title="Annuaire Écuries"
                            description="Trouvez la structure idéale parmi notre sélection d'excellence."
                            link="/directory"
                            linkText="Rechercher"
                        />
                        <FeatureCard 
                            icon={<BookOpen size={32} />}
                            title="Blog & Conseils"
                            description="Articles techniques et actualités du monde équin."
                            link="/blog"
                            linkText="Lire"
                        />
                        <FeatureCard 
                            icon={<ShoppingBag size={32} />}
                            title="Marketplace"
                            description="Achat et vente de matériel de luxe (Bientôt)."
                            link="#"
                            linkText="Bientôt"
                            disabled
                        />
                        <FeatureCard 
                            icon={<Star size={32} />}
                            title="Fidélité"
                            description="Avantages exclusifs pour nos membres distingués."
                            link="/loyalty"
                            linkText="Mon Compte"
                        />
                    </div>
                </div>
            </section>

            {/* LATEST NEWS SLIDER */}
            <section className="py-20 bg-slate-50 border-t border-gray-100 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-equidex-dark mb-2">Dernières Actualités</h2>
                            <div className="w-16 h-1 bg-amber-500"></div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => scroll('left')}
                                className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                aria-label="Précédent"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button 
                                onClick={() => scroll('right')}
                                className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                aria-label="Suivant"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Scrolling Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {latestPosts.map(post => (
                            <Link 
                                key={post.id} 
                                to={`/blog/${post.id}`} 
                                className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px] group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex-shrink-0"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                                
                                <div className="p-6 flex flex-col h-[200px]">
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">
                                        <Calendar size={12} /> {post.date}
                                    </div>
                                    
                                    <h3 className="text-lg font-serif font-bold text-slate-800 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center text-xs font-bold text-amber-600 uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                                        Lire l'article <ArrowRight size={14} className="ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="text-center mt-8 md:hidden">
                        <span className="text-xs text-gray-400 italic">Glissez pour voir plus &rarr;</span>
                    </div>
                </div>
            </section>

            {/* Image Break */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 h-96 relative rounded-lg overflow-hidden shadow-xl">
                        {/* CHANGEMENT D'IMAGE ICI : Photo de saut d'obstacles */}
                         <img 
                            src="https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=800&auto=format&fit=crop" 
                            alt="Cavalier saut" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <h3 className="text-3xl font-serif font-bold text-equidex-dark">L'Innovation au cœur de la tradition</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Chez The EquiDex, nous croyons que la tradition équestre mérite les meilleurs outils modernes. 
                            Notre intelligence artificielle, <strong>EquiBot</strong>, est là pour répondre à vos questions 
                            sur les soins, l'équipement et les compétitions, 24h/24 et 7j/7.
                        </p>
                        <Button variant="secondary">Découvrir EquiBot (en bas à droite)</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
    linkText: string;
    disabled?: boolean;
}> = ({ icon, title, description, link, linkText, disabled }) => (
    <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
        <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-equidex-dark mb-6 group-hover:bg-equidex-dark group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-gray-500 mb-6 text-sm leading-relaxed min-h-[3rem]">{description}</p>
        <Link to={link} className={`inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wide ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-amber-600 hover:text-amber-700'}`}>
            {linkText} {!disabled && <ArrowRight size={16} />}
        </Link>
    </div>
);
