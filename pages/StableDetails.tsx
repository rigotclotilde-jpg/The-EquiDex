import React, { useState } from 'react';
import { 
    MapPin, Star, Info, Ruler, Trophy, Euro, Home, Box, 
    Warehouse, Trees, Lightbulb, Dumbbell, Droplets, Lock, 
    Shield, Recycle, Calendar, Sun, Medal, GraduationCap, 
    Briefcase, CreditCard, Wheat, Footprints, School, 
    Users, User, Mail, Phone, Globe, Facebook, Instagram, 
    Youtube, Heart, Share2, Eye, CheckCircle, Map
} from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const StableDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState('presentation');

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative h-96 md:h-[500px] bg-cover bg-center flex items-end text-white" style={{ backgroundImage: 'url("https://picsum.photos/1920/600?random=15")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="relative z-10 container mx-auto px-4 pb-8 md:pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="w-full">
                            <div className="text-sm text-gray-300 mb-2 font-medium flex items-center gap-2">
                                <Link to="/" className="hover:text-amber-500">Accueil</Link> &gt; 
                                <Link to="/directory" className="hover:text-amber-500">Annuaire</Link> &gt; 
                                <span>Haras de la Forêt</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-shadow-lg">Haras de la Forêt</h1>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-lg">
                                <div className="flex items-center gap-2 text-gray-200">
                                    <MapPin className="text-amber-500" size={20} />
                                    12 Rue des Cavaliers, 78500 Sartrouville
                                </div>
                                <div className="flex items-center gap-2 text-gray-200">
                                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                                    <span className="font-bold">4.8/5.0</span>
                                    <span className="text-sm text-gray-400">(85 avis)</span>
                                </div>
                                <div className="inline-block px-3 py-1 bg-amber-600/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wide border border-amber-500/50">
                                    Écurie de Propriétaires PREMIUM 💎
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                             <Button variant="outline" className="flex-1 md:flex-none justify-center border-white text-white hover:bg-white/10">
                                <Share2 size={18} /> Partager
                             </Button>
                             <Button variant="outline" className="flex-1 md:flex-none justify-center border-white text-white hover:bg-white/10">
                                <Heart size={18} /> Favoris
                             </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Content */}
                    <div className="flex-grow w-full lg:w-3/4">
                        
                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
                            <div className="flex overflow-x-auto scrollbar-hide">
                                {[
                                    { id: 'presentation', label: 'Présentation', icon: <Info size={18} /> },
                                    { id: 'infra', label: 'Infrastructures', icon: <Ruler size={18} /> },
                                    { id: 'activites', label: 'Activités', icon: <Trophy size={18} /> },
                                    { id: 'tarifs', label: 'Tarifs', icon: <Euro size={18} /> },
                                    { id: 'avis', label: 'Avis', icon: <Star size={18} /> },
                                    { id: 'job', label: 'Emplois', icon: <Briefcase size={18} /> },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 hover:bg-slate-50 ${
                                            activeTab === tab.id
                                                ? 'border-amber-600 text-amber-600 bg-amber-50/50'
                                                : 'border-transparent text-gray-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tabs Content */}
                        <div className="space-y-8">
                            
                            {activeTab === 'presentation' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        A. Présentation de l'Établissement
                                    </h3>
                                    <div className="prose text-gray-600 leading-relaxed max-w-none">
                                        <p className="mb-4">
                                            Bienvenue au Haras de la Forêt, votre écurie de propriétaires haut de gamme aux portes de Paris. Nous offrons des installations modernes, des paddocks individuels, une surveillance 24/7 et des services de coaching personnalisés pour le dressage et l'obstacle.
                                        </p>
                                        <p className="mb-6">
                                            Notre priorité : le bien-être de votre cheval et la performance du couple cavalier-monture. Situés en lisière de forêt domaniale, nous offrons un accès direct à des kilomètres de pistes de trotting.
                                        </p>
                                        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-lg">
                                            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-amber-600" /> Fondé en 1998</span>
                                            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-amber-600" /> Label FFE Expert</span>
                                            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-amber-600" /> Écurie de Compétition</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'infra' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        B. Infrastructures (Détail Exhaustif)
                                    </h3>

                                    {/* Photo Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <img src="https://picsum.photos/400/300?random=20" alt="Manège" className="w-full h-48 object-cover rounded-lg shadow-sm hover:scale-[1.02] transition-transform cursor-pointer" />
                                        <img src="https://picsum.photos/400/300?random=21" alt="Paddock" className="w-full h-48 object-cover rounded-lg shadow-sm hover:scale-[1.02] transition-transform cursor-pointer" />
                                        <img src="https://picsum.photos/400/300?random=22" alt="Carrière" className="w-full h-48 object-cover rounded-lg shadow-sm hover:scale-[1.02] transition-transform cursor-pointer" />
                                    </div>

                                    <div className="space-y-8">
                                        {/* Logement */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Home size={20} /> Logement
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Type principal" value="Box avec Paddocks Individuel" isBadge />
                                                <DetailRow label="Autres types" value={['Pré avec Abri Naturel', 'Hébergement Mixte']} isBadges />
                                            </div>
                                        </div>

                                        {/* Aires de travail */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Ruler size={20} /> Aires de Travail & Sol
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Manèges Intérieurs" value="1 (Sol : Sable Fibré)" />
                                                <DetailRow label="Carrières Extérieures" value="2 (Sol : Sable de Fontainebleau)" />
                                                <DetailRow label="Éclairage" value="Carrière et Manège" />
                                            </div>
                                        </div>

                                        {/* Équipements */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Dumbbell size={20} /> Équipements & Soins
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Outils d'entraînement" value={['Marcheur (Simple)', 'Rond de Longe', 'Piste de Galop']} isBadges />
                                                <DetailRow label="Soins / Douche" value="Eau Chaude Disponible / Solarium : Oui" />
                                                <DetailRow label="Sellerie" value="Individuelle avec casier sécurisé" />
                                            </div>
                                        </div>

                                        {/* Sécurité */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Shield size={20} /> Sécurité & Environnement
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Surveillance" value={['Gardien sur place', 'Portail Codé', 'Vidéosurveillance']} isBadges />
                                                <DetailRow label="Démarche Durable" value={['Tri des Déchets', 'Gestion des Eaux (Citerne)']} isBadges />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activites' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        C. Activités & Services
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Calendar size={20} /> Stages & Enseignement
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Périodes" value={['Vacances Toussaint', 'Vacances Pâques', 'Week-ends']} isBadges />
                                                <DetailRow label="Thèmes" value={['Perfectionnement CSO', 'Passage de Galop']} isBadges />
                                                <DetailRow label="Diplômes" value={['DEJEPS', 'BPJEPS']} isBadges />
                                                <DetailRow label="Services Pro" value={['Pension Travail', 'Valorisation']} isBadges />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Trophy size={20} /> Compétitions
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Disciplines" value={['CSO', 'Dressage']} isBadges />
                                                <DetailRow label="Niveau" value={['Club', 'Amateur', 'Pro']} isBadges />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tarifs' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        E. Tarifs & Conditions
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <CreditCard size={20} /> Pensions (Mensuel)
                                            </h4>
                                            <div className="grid gap-3">
                                                <PriceRow label="BOX CLASSIQUE" price="750 €" />
                                                <PriceRow label="Supplément Paddock Individuel" price="+50 €" />
                                                <PriceRow label="Pension Pré avec Abri" price="450 €" />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Wheat size={20} /> Alimentation & Services
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Litière Paille" value="Inclus" isBadge />
                                                <DetailRow label="Foin à volonté" value="Oui (3x/jour)" />
                                                <DetailRow label="Sortie Paddock" value="Inclus (5j/7)" />
                                                <PriceRow label="Forfait Travail (5 séances)" price="150 €" />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <School size={20} /> Enseignement
                                            </h4>
                                            <div className="grid gap-3">
                                                <PriceRow label="Cours Collectif" price="25 €" subLabel="/ séance" />
                                                <PriceRow label="Cours Particulier" price="45 €" subLabel="/ séance" />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <FileText size={20} /> Conditions
                                            </h4>
                                            <div className="grid gap-3">
                                                <PriceRow label="Adhésion Annuelle" price="120 €" />
                                                <DetailRow label="Préavis de départ" value="1 mois" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'avis' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        F. Avis Clients
                                    </h3>
                                    
                                    <div className="flex items-center gap-6 mb-8 bg-slate-50 p-6 rounded-xl">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-slate-800 mb-1">4.8</div>
                                            <div className="flex justify-center gap-1 text-yellow-400 mb-1">
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} className="text-yellow-400/50" />
                                            </div>
                                            <div className="text-xs text-gray-500">85 avis</div>
                                        </div>
                                        <div className="flex-grow border-l border-gray-200 pl-6">
                                            <p className="text-gray-600 italic text-lg leading-relaxed">
                                                "Ambiance familiale et installations impeccables. Le coaching dressage avec Monsieur Lenoir est exceptionnel. Mon cheval n'a jamais été aussi bien."
                                            </p>
                                            <div className="mt-4 font-bold text-slate-800">— Sophie D. <span className="text-xs font-normal text-gray-500 ml-2">Propriétaire depuis 3 ans</span></div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <Button variant="outline">Lire tous les avis</Button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        
                        {/* Contact Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <User size={18} className="text-amber-600" /> Contacts
                            </h3>
                            
                            <div className="space-y-4 text-sm">
                                <div className="flex gap-3">
                                    <Users size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase">Nom Commercial</span>
                                        <span className="font-medium text-slate-800">Haras de la Forêt</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Briefcase size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase">Société</span>
                                        <span className="font-medium text-slate-800">SARL Écuries de l'Ouest</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Mail size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase">Email</span>
                                        <a href="mailto:contact@haras.fr" className="font-medium text-amber-700 hover:underline">contact@haras.fr</a>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Phone size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase">Téléphone</span>
                                        <span className="font-medium text-slate-800">01 30 00 00 00</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Globe size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase">Site Web</span>
                                        <a href="#" className="font-medium text-amber-700 hover:underline">www.haras.fr</a>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full mt-6 justify-center">Contacter</Button>
                        </div>

                        {/* Social & Manager */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <Share2 size={18} className="text-amber-600" /> Réseaux
                            </h3>
                            
                            <div className="mb-6">
                                <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Dirigeant</span>
                                <span className="font-medium text-slate-800 flex items-center gap-2">
                                    <User size={16} /> M. Jean-Claude Dupond
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <SocialBtn icon={<Facebook size={18} />} />
                                <SocialBtn icon={<Instagram size={18} />} />
                                <SocialBtn icon={<Youtube size={18} />} />
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <Map size={18} className="text-amber-600" /> Localisation
                            </h3>
                            <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-gray-100">
                                <MapPin size={32} className="mb-2" />
                            </div>
                        </div>
                        
                        {/* Loyalty */}
                        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
                                <Star size={18} className="fill-amber-600 text-amber-600" /> Fidélité
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Cette écurie est partenaire <strong className="text-amber-700">ÉquiDex</strong>. Chaque euro dépensé vous rapporte des Pts. Ferrure !
                            </p>
                            <Link to="/loyalty" className="text-xs font-bold text-amber-600 uppercase hover:underline tracking-wide">
                                En savoir plus &rarr;
                            </Link>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const DetailRow: React.FC<{ label: string; value: string | string[]; isBadge?: boolean; isBadges?: boolean }> = ({ label, value, isBadge, isBadges }) => (
    <div className="flex items-start text-sm">
        <span className="font-bold text-gray-500 min-w-[150px]">{label} :</span>
        <div className="flex-1 font-medium text-slate-800">
            {isBadge ? (
                <span className="inline-block px-2 py-0.5 bg-amber-600 text-white rounded text-xs font-bold">{value}</span>
            ) : isBadges && Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2">
                    {value.map((v, i) => (
                        <span key={i} className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${i === 0 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {v}
                        </span>
                    ))}
                </div>
            ) : (
                value
            )}
        </div>
    </div>
);

const PriceRow: React.FC<{ label: string; price: string; subLabel?: string }> = ({ label, price, subLabel }) => (
    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
        <span className="font-medium text-slate-600">{label}</span>
        <div className="text-right">
            <span className="font-bold text-lg text-amber-700">{price}</span>
            {subLabel && <span className="text-xs text-gray-400 ml-1">{subLabel}</span>}
        </div>
    </div>
);

const SocialBtn: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all">
        {icon}
    </button>
);

// Re-declare FileText icon just for this component if needed, though CheckCircle is used above.
import { FileText } from 'lucide-react';
