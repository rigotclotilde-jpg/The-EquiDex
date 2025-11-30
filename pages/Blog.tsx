
import React, { useState } from 'react';
import { Calendar, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS_DATA } from '../data/mockData';

const CATEGORIES = [
    { id: 'All', label: 'Tout voir' },
    { id: 'Bien-être', label: 'Bien-être' },
    { id: 'Compétitions', label: 'Compétitions' },
    { id: 'Disciplines', label: 'Disciplines' },
    { id: 'Équipement', label: 'Équipement' },
    { id: 'Examens', label: 'Examens' },
    { id: 'Histoire', label: 'Histoire' },
    { id: 'Infrastructures', label: 'Infrastructures' },
    { id: 'Métiers', label: 'Métiers' },
    { id: 'Luxe équestre', label: 'Luxe équestre' },
    { id: 'Races', label: 'Races' },
    { id: 'Technologie', label: 'Technologie' },
    { id: 'Arts', label: 'Arts' },
];

export const Blog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const postsArray = Object.values(BLOG_POSTS_DATA).sort((a, b) => Number(b.id) - Number(a.id));

    const filteredPosts = postsArray.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Header Section */}
                <div className="mb-12 pl-4 border-l-4 border-amber-500">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-equidex-dark mb-4">Actualités et Conseils Équestres</h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Explorez nos articles les plus récents et nos dossiers complets sur le bien-être équin, la compétition et le lifestyle de luxe.
                    </p>
                </div>

                {/* Filter & Search Section */}
                <div className="border-t border-b border-gray-100 py-8 mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative w-full lg:w-96">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Rechercher un article..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Category Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-end gap-2 w-full lg:flex-1">
                        {CATEGORIES.map(category => (
                            <button 
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                                    activeCategory === category.id 
                                        ? 'bg-amber-600 text-white border-amber-600 shadow-md' 
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-amber-600 hover:text-amber-600'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ad Banner */}
                <div className="bg-slate-50 border border-gray-200 rounded-lg p-8 text-center max-w-3xl mx-auto mb-16 shadow-sm">
                    <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">Publicité</p>
                    <a href="https://www.hermes.com/fr/fr/sellerie/" target="_blank" rel="noopener noreferrer" className="text-xl md:text-2xl font-serif font-bold text-slate-800 hover:text-amber-700 transition-colors flex items-center justify-center gap-2">
                        Découvrez la nouvelle collection de sellerie de luxe Hermès
                        <ExternalLink size={20} />
                    </a>
                </div>

                {/* Articles Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredPosts.map(post => (
                            <article key={post.id} className="group cursor-pointer bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <Link to={`/blog/${post.id}`} className="block h-full">
                                    <div className="overflow-hidden h-56 relative">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded shadow-md">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide border-b border-gray-50 pb-3">
                                            <Calendar size={14} /> {post.date}
                                        </div>
                                        
                                        <h2 className="text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2 h-14">
                                            {post.title}
                                        </h2>
                                        
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 h-12">
                                            {post.excerpt}
                                        </p>
                                        
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-slate-900 transition-colors group-hover:translate-x-1 transform duration-200">
                                            Lire l'article <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-gray-300">
                        <div className="text-gray-400 mb-2">Aucun article trouvé.</div>
                        <p className="text-gray-500">Essayez de modifier vos filtres de recherche.</p>
                    </div>
                )}

            </div>
        </div>
    );
};
