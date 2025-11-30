
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    MapPin, Clock, Euro, Building, CheckCircle, 
    Briefcase, ArrowLeft, Share2, Star, 
    Globe, Upload, Send, Shield
} from 'lucide-react';
import { Button } from '../components/Button';
import { useJobContext } from '../context/JobContext';
import { JobOffer } from '../types';

export const JobDetails: React.FC = () => {
    const { id } = useParams();
    const { jobs } = useJobContext();
    const [job, setJob] = useState<JobOffer | undefined>(undefined);
    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
        if (id) {
            const foundJob = jobs.find(j => j.id === Number(id));
            setJob(foundJob);
        }
    }, [id, jobs]);

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Offre non trouvée</h2>
                    <Link to="/jobs">
                        <Button variant="primary">Retour aux offres</Button>
                    </Link>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-serif text-slate-900">
            
            {/* Header / Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <Link to="/jobs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-amber-600 transition-colors mb-6">
                        <ArrowLeft size={14} /> Retour aux offres
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wide rounded-sm">
                                    {job.type}
                                </span>
                                {job.isPremium && (
                                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 uppercase tracking-wide">
                                        <Star size={12} className="fill-amber-600" /> Offre Premium
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{job.title}</h1>
                            
                            <div className="flex flex-wrap gap-6 text-sm text-gray-600 font-sans">
                                <div className="flex items-center gap-2">
                                    <Building size={16} className="text-amber-600" />
                                    <span className="font-bold text-slate-800">{job.company}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Euro size={16} className="text-gray-400" />
                                    {job.salary}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    {job.date}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="p-3 border border-gray-200 rounded-lg text-gray-500 hover:text-amber-600 hover:border-amber-600 transition-all">
                                <Share2 size={20} />
                            </button>
                            <Button 
                                variant="primary" 
                                className="flex-grow md:flex-none justify-center px-8"
                                onClick={() => {
                                    const element = document.getElementById('apply-form');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Postuler maintenant
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    
                    {/* Description */}
                    <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">
                            <div className="w-1 h-6 bg-amber-600"></div> Présentation du Poste
                        </h2>
                        <p className="text-gray-600 leading-relaxed font-sans text-lg mb-8">
                            {job.description}
                        </p>

                        <h3 className="text-lg font-bold text-slate-800 mb-4 font-sans">Vos Missions :</h3>
                        <ul className="space-y-3 mb-8">
                            {job.missions.map((mission, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-600 font-sans">
                                    <CheckCircle size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>{mission}</span>
                                </li>
                            ))}
                        </ul>

                         {/* Images - Mocked for consistency if not present */}
                        <div className="grid grid-cols-3 gap-4 my-8">
                             <img src={job.image} alt="Illustration poste" className="w-full h-32 object-cover rounded-lg shadow-sm" />
                             <img src="https://picsum.photos/400/300?random=88" alt="Illustration" className="w-full h-32 object-cover rounded-lg shadow-sm" />
                             <img src="https://picsum.photos/400/300?random=99" alt="Illustration" className="w-full h-32 object-cover rounded-lg shadow-sm" />
                        </div>
                    </section>

                    {/* Profil & Avantages */}
                    <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                         <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900 mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">
                            <div className="w-1 h-6 bg-amber-600"></div> Profil & Avantages
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 font-sans flex items-center gap-2">
                                    <Briefcase size={18} className="text-gray-400" /> Profil Recherché
                                </h3>
                                <ul className="space-y-3">
                                    {job.profile.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 font-sans list-disc list-inside marker:text-amber-600">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 font-sans flex items-center gap-2">
                                    <Star size={18} className="text-gray-400" /> Ce que nous offrons
                                </h3>
                                <ul className="space-y-3">
                                    {job.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-700 font-sans bg-amber-50 p-2 rounded">
                                            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Apply Form */}
                    <section id="apply-form" className="bg-slate-900 text-white p-8 md:p-12 rounded-xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold font-serif mb-2">Postuler à cette offre</h2>
                            <p className="text-gray-400 mb-8 font-sans">Envoyez votre candidature directement au recruteur via The EquiDex.</p>

                            <form className="space-y-4 max-w-xl" onSubmit={(e) => { e.preventDefault(); setIsApplying(true); setTimeout(() => alert('Candidature envoyée !'), 1000); }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Votre Nom" className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded p-3 outline-none focus:border-amber-600 transition-colors" required />
                                    <input type="text" placeholder="Votre Prénom" className="bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded p-3 outline-none focus:border-amber-600 transition-colors" required />
                                </div>
                                <input type="email" placeholder="Votre Email" className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded p-3 outline-none focus:border-amber-600 transition-colors" required />
                                <input type="tel" placeholder="Votre Téléphone" className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded p-3 outline-none focus:border-amber-600 transition-colors" />
                                
                                <div className="p-6 border-2 border-dashed border-white/20 rounded-lg text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                    <Upload className="mx-auto text-gray-400 group-hover:text-amber-500 mb-2" />
                                    <p className="text-sm font-bold text-gray-300">CV & Lettre de motivation</p>
                                    <p className="text-xs text-gray-500">PDF, DOCX (Max 5 Mo)</p>
                                </div>

                                <textarea rows={4} placeholder="Un petit mot pour le recruteur..." className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded p-3 outline-none focus:border-amber-600 transition-colors"></textarea>

                                <Button variant="primary" type="submit" className="w-full justify-center py-4 bg-amber-600 border-amber-600 hover:bg-amber-700 hover:border-amber-700 text-white font-bold tracking-widest uppercase">
                                    {isApplying ? 'Envoi en cours...' : <><Send size={18} className="mr-2" /> Envoyer ma candidature</>}
                                </Button>
                            </form>
                        </div>
                    </section>

                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1 space-y-6">
                    
                    {/* Company Card */}
                    <div className="bg-white border border-gray-200 p-6 shadow-sm rounded-lg">
                        <div className="flex items-center gap-4 mb-6">
                            <img src={job.image} alt="Logo" className="w-16 h-16 rounded-full object-cover border border-gray-100" />
                            <div>
                                <h3 className="font-bold text-slate-900">{job.company}</h3>
                                <p className="text-xs text-amber-600 font-bold uppercase tracking-wide">Recruteur Vérifié</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4 text-sm font-sans border-t border-gray-100 pt-4">
                            <p className="flex items-center gap-3 text-gray-600">
                                <Globe size={16} className="text-gray-400" />
                                <a href="#" className="hover:text-amber-600 underline">Site Web</a>
                            </p>
                            <p className="flex items-center gap-3 text-gray-600">
                                <MapPin size={16} className="text-gray-400" />
                                {job.location}
                            </p>
                            <p className="text-gray-500 text-xs italic mt-4">
                                "Écurie de propriétaires haut de gamme alliant sport et bien-être animal."
                            </p>
                        </div>

                        <div className="mt-6">
                             <Button variant="outline" className="w-full justify-center text-xs">Voir la fiche écurie</Button>
                        </div>
                    </div>

                    {/* Key Info */}
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-lg">
                        <h4 className="font-bold text-amber-800 uppercase text-xs tracking-widest mb-4">Récapitulatif</h4>
                        <ul className="space-y-3 text-sm font-sans">
                            <li className="flex justify-between">
                                <span className="text-gray-500">Référence</span>
                                <span className="font-bold text-slate-800">{job.ref || 'N/A'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">Contrat</span>
                                <span className="font-bold text-slate-800">{job.type}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">Début</span>
                                <span className="font-bold text-slate-800">{job.start || 'Dès que possible'}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">Salaire</span>
                                <span className="font-bold text-slate-800 text-right max-w-[50%]">{job.salary}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Safety Tips */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg">
                         <h4 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                             <Shield size={14} /> Sécurité
                         </h4>
                         <p className="text-xs text-gray-500 leading-relaxed font-sans">
                             Ne versez jamais d'argent pour obtenir un entretien. The EquiDex vérifie les recruteurs mais restez vigilants.
                         </p>
                    </div>

                </aside>
            </div>
        </div>
    );
};
