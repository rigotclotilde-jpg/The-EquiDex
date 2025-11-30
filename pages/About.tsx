
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, Award } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-serif text-slate-900 pb-20">
             {/* Header */}
             <div className="bg-slate-50 py-16 border-b border-gray-200">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="mb-6 flex justify-center">
                        <Link to="/" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-slate-900 transition-colors">
                            <ArrowLeft size={14} /> Retour à l'accueil
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-equidex-dark">Qui sommes-nous ?</h1>
                    <p className="text-gray-500 italic font-sans text-sm">
                        L'excellence équestre réinventée
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-slate max-w-none font-sans text-gray-600 leading-relaxed">
                    <section className="mb-12">
                         <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Notre Mission</h2>
                         <p className="mb-4">
                             Fondée par des passionnés pour des passionnés, <strong>The EquiDex</strong> est née d'un constat simple : le monde équestre manquait d'une plateforme centralisée alliant excellence technique, esthétique soignée et services innovants.
                         </p>
                         <p>
                             Notre vocation est de connecter les cavaliers exigeants avec les meilleures écuries, les professionnels les plus qualifiés et les marques les plus prestigieuses, le tout soutenu par une intelligence artificielle de pointe.
                         </p>
                    </section>

                    {/* Values Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-slate-50 p-6 rounded-lg text-center border border-gray-100">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-sm">
                                 <Award size={24} />
                             </div>
                             <h3 className="font-bold text-slate-900 mb-2">Excellence</h3>
                             <p className="text-sm text-gray-500">Nous sélectionnons rigoureusement nos partenaires pour garantir une qualité sans compromis.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-lg text-center border border-gray-100">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-sm">
                                 <Target size={24} />
                             </div>
                             <h3 className="font-bold text-slate-900 mb-2">Innovation</h3>
                             <p className="text-sm text-gray-500">Nous intégrons les dernières technologies (IA) pour servir la tradition équestre.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-lg text-center border border-gray-100">
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-sm">
                                 <Users size={24} />
                             </div>
                             <h3 className="font-bold text-slate-900 mb-2">Communauté</h3>
                             <p className="text-sm text-gray-500">Nous bâtissons un réseau de confiance où l'entraide et le partage sont rois.</p>
                        </div>
                    </div>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Notre Histoire</h2>
                        <p>
                            Lancée en 2025, The EquiDex s'est rapidement imposée comme la référence digitale du secteur. Initialement conçue comme un annuaire sélectif, la plateforme a évolué pour devenir un écosystème complet incluant emploi, formation, et gestion de carrière pour les professionnels.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};
