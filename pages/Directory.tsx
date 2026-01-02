
import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Filter, Crown, Bed, Ruler, Euro, Building, Map as MapIcon, List, Check } from 'lucide-react';
import { Stable } from '../types';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { useUserContext } from '../context/UserContext';
import { api } from '../services/api';

// Initial mock data kept for fallback during development
const DEFAULT_STABLES: Stable[] = [
    {
        id: 1,
        name: "Haras de la Forêt",
        location: "78500 Sartrouville, Yvelines",
        distance: "8.5 km",
        specialty: "Pension Travail / Box-Paddock",
        type: "Écurie de Propriétaires",
        rating: 4.8,
        reviewsCount: 85,
        price: 750,
        facilities: ["Manège", "Solarium", "Sorties Forêt"],
        imageUrl: "https://picsum.photos/400/300?random=15",
        isPremium: true
    },
    {
        id: 4,
        name: "Pôle International de Deauville",
        location: "14800 Deauville",
        distance: "190 km",
        specialty: "Compétition Haut Niveau",
        type: "Pôle Compétition",
        rating: 4.9,
        reviewsCount: 320,
        price: 950,
        facilities: ["Manège Olympique", "Piste Galop", "Restaurant"],
        imageUrl: "https://picsum.photos/400/300?random=13",
        isPremium: true
    }
];

export const Directory: React.FC = () => {
    const [priceRange, setPriceRange] = useState(1000);
    const [filters, setFilters] = useState({
        location: '',
        keyword: '',
        types: [] as string[],
        pension: [] as string[],
        infra: [] as string[]
    });

    const [stables, setStables] = useState<Stable[]>(DEFAULT_STABLES);
    const { user } = useUserContext();

    useEffect(() => {
        (async () => {
            const data = await api.stables.getAll();
            if (data && data.length) {
                // Normalize to Stable type where possible
                const mapped = data.map((s: any) => ({
                    id: s.id,
                    name: s.name,
                    location: s.location || s.address || 'France',
                    distance: s.distance || 'N/A',
                    specialty: s.specialty || s.type || '',
                    type: s.type || 'Écurie',
                    rating: s.rating || 0,
                    reviewsCount: s.reviews_count || 0,
                    price: s.price || 0,
                    facilities: s.facilities || [],
                    imageUrl: s.image_url || `https://picsum.photos/400/300?random=${s.id}`,
                    isPremium: s.is_premium || false,
                    description: s.description || ''
                }));
                setStables(mapped);
            }
        })();
    }, []);

    // Filter Logic
    const filteredStables = stables.filter(stable => {
        if (stable.price && stable.price > priceRange) return false;
        if (filters.location && !stable.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.keyword && !stable.name.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="bg-white min-h-screen pb-12 text-slate-900 font-serif">
            
            {/* Luxe Hero Header */}
            <div className="bg-[#f4f1eb] py-20 text-center border-b-4 border-amber-600 relative overflow-hidden">
                {/* Subtle pattern overlay could go here */}
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-black mb-4 tracking-tight">
                        Annuaire d'Excellence
                    </h1>
                    <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light font-sans">
                        Découvrez une sélection rigoureuse d'écuries, haras et centres équestres répondant aux standards les plus élevés.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 max-w-[1600px]">
                
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-1/4 lg:min-w-[300px]">
                    <div className="bg-white border border-gray-200 p-6 shadow-sm sticky top-24">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Filter size={20} className="text-amber-600" /> Filtres
                            </h3>
                            <span className="text-xs text-gray-400 font-sans">{filteredStables.length} résultats</span>
                        </div>
                        
                        <div className="space-y-8 font-sans">
                            {/* Location */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Localisation</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-3 text-amber-600" />
                                    <input 
                                        type="text" 
                                        placeholder="Ville, Région..." 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-600 outline-none transition-colors text-sm rounded-none"
                                        value={filters.location}
                                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Keyword */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Recherche</label>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-3 text-amber-600" />
                                    <input 
                                        type="text" 
                                        placeholder="Nom, Discipline..." 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-600 outline-none transition-colors text-sm rounded-none"
                                        value={filters.keyword}
                                        onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Checkbox Groups */}
                            <FilterGroup title="Type de Structure" icon={<Building size={14} />}>
                                {['Écurie de Propriétaires', 'Centre Équestre', 'Haras', 'Pôle Compétition'].map(t => (
                                    <Checkbox key={t} label={t} />
                                ))}
                            </FilterGroup>

                            <FilterGroup title="Pension" icon={<Bed size={14} />}>
                                {['Box', 'Pré', 'Box/Paddock', 'Travail'].map(t => (
                                    <Checkbox key={t} label={t} />
                                ))}
                            </FilterGroup>

                            {/* Budget */}
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <Euro size={14} className="text-amber-600" /> Budget Max
                                </label>
                                <div className="px-2">
                                    <input 
                                        type="range" 
                                        min="200" 
                                        max="1500" 
                                        step="50"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                    />
                                    <div className="flex justify-between mt-2 text-sm font-medium text-amber-800">
                                        <span>200€</span>
                                        <span>{priceRange}€</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 space-y-3">
                                <Button className="w-full justify-center bg-black text-white hover:bg-gray-800">
                                    Appliquer
                                </Button>
                                <button 
                                    onClick={() => {setFilters({location: '', keyword: '', types: [], pension: [], infra: []}); setPriceRange(1500)}}
                                    className="w-full text-xs font-bold text-gray-400 hover:text-amber-600 uppercase tracking-wide transition-colors"
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Results Section */}
                <section className="w-full lg:w-3/4">
                    
                    {/* Toolbar */}
                    <div className="flex flex-wrap justify-between items-center mb-8 pb-4 border-b border-gray-100 gap-4 font-sans">
                        <p className="text-sm text-gray-500">
                            Affichage de <strong className="text-black">{filteredStables.length}</strong> établissements
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label htmlFor="sort" className="text-xs font-bold uppercase text-gray-400">Trier par</label>
                                <select id="sort" className="border-none bg-transparent text-sm font-bold text-black focus:ring-0 cursor-pointer hover:text-amber-600 transition-colors">
                                    <option value="relevance">Pertinence</option>
                                    <option value="note">Note</option>
                                    <option value="price">Prix</option>
                                </select>
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <div className="flex gap-1">
                                <button className="p-1.5 text-black bg-gray-100 rounded hover:bg-gray-200"><List size={18} /></button>
                                <button className="p-1.5 text-gray-400 hover:text-black transition-colors"><MapIcon size={18} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Cards List */}
                    <div className="space-y-8">
                        {filteredStables.map(stable => (
                            <div 
                                key={stable.id} 
                                className={`group bg-white border transition-all duration-300 flex flex-col md:flex-row overflow-hidden ${
                                    stable.isPremium 
                                        ? 'border-amber-200 shadow-md hover:shadow-xl hover:border-amber-400' 
                                        : 'border-gray-100 hover:shadow-lg hover:border-gray-300'
                                }`}
                            >
                                {/* Image Section */}
                                <div className="w-full md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                    <img 
                                        src={stable.imageUrl} 
                                        alt={stable.name} 
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {stable.isPremium && (
                                        <div className="absolute top-0 left-0 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 flex items-center gap-1 shadow-sm">
                                            <Crown size={12} /> Premium
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 md:hidden">
                                        <span className="text-white font-bold text-lg">{stable.price}€ <span className="text-xs font-normal opacity-80">/mois</span></span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                                                <Link to={`/stable/${stable.id}`}>{stable.name}</Link>
                                            </h3>
                                            {stable.rating >= 4.8 && (
                                                <div className="hidden md:flex items-center gap-1 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                                                    <Star size={12} className="fill-amber-500 text-amber-500" />
                                                    <span className="text-xs font-bold text-amber-800">{stable.rating}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-sans">
                                            <MapPin size={14} className="text-amber-600" />
                                            <span>{stable.location}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                                            <span className="font-medium text-slate-700">{stable.distance}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {stable.type} • {stable.specialty}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {stable.facilities?.map((fac, i) => (
                                                <span key={i} className="px-2 py-1 border border-gray-200 text-xs text-gray-500 uppercase tracking-wide font-medium bg-gray-50/50">
                                                    {fac}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Action Row */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 border-dashed">
                                        <div className="hidden md:block">
                                            <span className="block text-2xl font-serif font-bold text-slate-900">
                                                {stable.price}€
                                                <span className="text-xs font-sans font-normal text-gray-400 ml-1 uppercase">/ mois</span>
                                            </span>
                                        </div>
                                        <Link to={`/stable/${stable.id}`} className="w-full md:w-auto">
                                            <Button 
                                                variant={stable.isPremium ? 'primary' : 'secondary'} 
                                                className="w-full justify-center md:w-auto"
                                            >
                                                Voir la fiche
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Mock */}
                    <div className="mt-12 flex justify-center gap-2 font-sans">
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors">1</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-black bg-black text-white">2</button>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors">3</button>
                        <span className="flex items-end px-2 text-gray-400">...</span>
                        <button className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-black hover:border-black transition-colors">12</button>
                    </div>

                </section>
            </div>
        </div>
    );
};

// Sub-components
const FilterGroup: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mb-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span className="text-amber-600">{icon}</span> {title}
        </h4>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

const Checkbox: React.FC<{ label: string }> = ({ label }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
            <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-amber-600 checked:border-amber-600 transition-colors" />
            <Check size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
        </div>
        <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{label}</span>
    </label>
);
