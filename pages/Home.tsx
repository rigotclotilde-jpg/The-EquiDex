
import React from 'react';
import { ArrowRight, Star, ShoppingBag, BookOpen, Map as MapIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src="https://picsum.photos/1920/1080?random=1"
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
                        <Link to="/loyalty">
                            <Button variant="outline" className="w-full sm:w-auto text-lg py-3 px-8">
                                Programme Fidélité
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Poles */}
            <section className="py-20 bg-white">
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

            {/* Image Break */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 h-96 relative rounded-lg overflow-hidden shadow-xl">
                         <img 
                            src="https://picsum.photos/800/600?random=2" 
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
