
import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Euro, Home, Search, Filter, CheckCircle, Star, ArrowRight, Building, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { useUserContext } from '../context/UserContext';

export const Jobs: React.FC = () => {
    const { jobs, isLoading } = useJobContext();
    const { user } = useUserContext();
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        types: [] as string[]
    });

    // Filtering logic
    const filteredJobs = jobs.filter(job => {
        const matchKeyword = job.title.toLowerCase().includes(filters.keyword.toLowerCase()) || 
                             job.company.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchLocation = filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase());
        return matchKeyword && matchLocation;
    });

    return (
        <div className="bg-white min-h-screen pb-12 font-serif text-slate-900">
            
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1468912637438-57c74929d8cd?q=80&w=2000&auto=format&fit=crop" 
                        alt="Equestrian Career" 
                        className="w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8 animate-fade-in shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-50">Career Center</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg">
                        Carrières & <span className="italic text-amber-500 font-light">Opportunités</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light font-sans mb-10 leading-relaxed text-shadow-sm">
                        Trouvez votre place au sein des écuries les plus prestigieuses. 
                        <br className="hidden md:block"/>
                        L'excellence recrute l'excellence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                         {user?.type === 'pro' && (
                            <Link to="/pro-dashboard">
                                <Button className="bg-amber-600 border-amber-600 hover:bg-amber-700 text-white px-8 py-4 shadow-xl hover:shadow-amber-900/40 hover:-translate-y-1 transition-all text-sm tracking-widest">
                                    Recruteurs : Déposer une offre
                                </Button>
                            </Link>
                         )}
                         <button 
                            onClick={() => document.getElementById('jobs-list')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
                         >
                            Voir les offres <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                         </button>
                    </div>
                </div>
            </div>

            <div id="jobs-list" className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 max-w-[1600px]">
                
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-1/4 lg:min-w-[300px]">
                    <div className="bg-white border border-gray-200 p-6 shadow-sm sticky top-24">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Filter size={20} className="text-amber-600" /> Filtres
                            </h3>
                            <span className="text-xs text-gray-400 font-sans">{filteredJobs.length} offres</span>
                        </div>

                        <div className="space-y-6 font-sans">
                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Mots-clés</label>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-3 text-amber-600" />
                                    <input 
                                        type="text" 
                                        placeholder="Groom, Cavalier..." 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-600 outline-none transition-colors text-sm"
                                        value={filters.keyword}
                                        onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3 block">Localisation</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-3 text-amber-600" />
                                    <input 
                                        type="text" 
                                        placeholder="Ville ou Région" 
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-600 outline-none transition-colors text-sm"
                                        value={filters.location}
                                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                                    <Briefcase size={14} className="text-amber-600" /> Type de Contrat
                                </h4>
                                <div className="space-y-2">
                                    {['CDI', 'CDD', 'Freelance', 'Stage'].map(t => (
                                        <label key={t} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-amber-600 checked:border-amber-600 transition-colors" />
                                                <CheckCircle size={10} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                                            </div>
                                            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{t}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full justify-center bg-black text-white hover:bg-gray-800 mt-4">
                                Appliquer
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Results Section */}
                <section className="w-full lg:w-3/4">
                    
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 h-96">
                            <Loader2 size={48} className="text-amber-600 animate-spin mb-4" />
                            <p className="text-gray-500 animate-pulse">Recherche des meilleures opportunités...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredJobs.map(job => (
                                <div 
                                    key={job.id} 
                                    className={`bg-white border transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 group hover:border-amber-300 hover:shadow-lg ${
                                        job.isPremium ? 'border-l-4 border-l-amber-600 border-y-gray-100 border-r-gray-100' : 'border-gray-100'
                                    }`}
                                >
                                    {/* Logo / Image */}
                                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                                        <img 
                                            src={job.image} 
                                            alt={job.company} 
                                            className="w-full h-full object-cover rounded-full border border-gray-100 group-hover:scale-105 transition-transform"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-grow">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                                            <div>
                                                <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                                                    {job.title}
                                                    {job.isPremium && <Star size={14} className="fill-amber-500 text-amber-500" />}
                                                </h3>
                                                <p className="text-sm font-bold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                                                    <Building size={12} /> {job.company}
                                                </p>
                                            </div>
                                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full whitespace-nowrap self-start">
                                                {job.type}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-sans mb-4">
                                            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                            <span className="flex items-center gap-1"><Euro size={14} /> {job.salary}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {job.date}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {job.description}
                                        </p>

                                        {/* Perks Tags */}
                                        {job.perks && job.perks.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {job.perks.map((perk, i) => (
                                                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 border border-gray-100 text-xs text-slate-600 font-medium rounded">
                                                        <Home size={10} className="text-amber-600" /> {perk}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <div className="flex flex-col justify-between items-end min-w-[140px]">
                                        <div className="hidden md:block"></div> {/* Spacer */}
                                        <Link to={`/jobs/${job.id}`} className="w-full md:w-auto">
                                            <Button variant={job.isPremium ? 'primary' : 'secondary'} className="w-full justify-center md:w-auto text-xs py-3">
                                                Voir l'offre <ArrowRight size={14} />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading && filteredJobs.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 border border-dashed border-gray-300 rounded-lg">
                            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-600">Aucune offre trouvée</h3>
                            <p className="text-gray-500 text-sm mb-6">Essayez de modifier vos critères de recherche.</p>
                            <Button variant="outline" onClick={() => setFilters({keyword: '', location: '', types: []})}>
                                Réinitialiser les filtres
                            </Button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
