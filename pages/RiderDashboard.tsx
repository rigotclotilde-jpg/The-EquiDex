
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    Home, 
    User, 
    Crown, 
    History, 
    Settings, 
    Trophy, 
    PlusCircle, 
    Star, 
    Award, 
    ShoppingBag, 
    BookOpen, 
    Key, 
    Bell, 
    Database,
    LogOut
} from 'lucide-react';
import { Button } from '../components/Button';

export const RiderDashboard: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="bg-[#FAFAFA] min-h-[calc(100vh-80px)] flex flex-col md:flex-row max-w-[1600px] mx-auto">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-[250px] bg-white border-b md:border-b-0 md:border-r border-gray-200 flex-shrink-0">
                <div className="p-4 md:p-8 sticky top-20">
                    <nav className="overflow-x-auto md:overflow-visible">
                        <ul className="flex md:flex-col gap-2 md:gap-1 min-w-max md:min-w-0">
                            <li>
                                <Link 
                                    to="/rider-dashboard" 
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-all duration-300 ${
                                        isActive('/rider-dashboard') 
                                            ? 'bg-equidex-gold text-white shadow-md' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                                    }`}
                                >
                                    <Home size={18} /> Tableau de Bord
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="#" 
                                    className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                >
                                    <User size={18} /> Mon Profil Public
                                </Link>
                            </li>

                            {/* Section Title */}
                            <li className="hidden md:block mt-6 mb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Programme Fidélité
                            </li>
                            <li>
                                <Link 
                                    to="/loyalty" 
                                    className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                >
                                    <Crown size={18} /> Éperon d'Or
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="#" 
                                    className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                >
                                    <History size={18} /> Historique (FH)
                                </Link>
                            </li>

                            {/* Section Title */}
                            <li className="hidden md:block mt-6 mb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Compte
                            </li>
                            {/* Lien Abonnement supprimé ici */}
                            <li>
                                <Link 
                                    to="#" 
                                    className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                >
                                    <Settings size={18} /> Paramètres
                                </Link>
                            </li>
                             <li className="md:mt-8">
                                <Link 
                                    to="/auth" 
                                    className="flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={18} /> Déconnexion
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-6 md:p-10">
                
                <h1 className="text-3xl font-serif font-light text-black mb-8">Synthèse de votre Espace Cavalier</h1>

                {/* Section: Gamification */}
                <section className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm mb-8 animate-fade-in">
                    <h2 className="text-xl font-serif text-equidex-gold mb-6 flex items-center gap-2">
                        Mon Statut Éperon d'Or
                    </h2>
                    
                    {/* Grille modifiée en 2 colonnes car la carte abonnement a été supprimée */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Status Card */}
                        <div className="bg-[#FAFAFA] p-6 border border-gray-100 border-t-4 border-t-gray-400 text-center flex flex-col justify-between h-full">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Statut Actuel</p>
                                <h3 className="text-2xl font-serif font-bold text-gray-500 mb-2 flex items-center justify-center gap-2">
                                    <Trophy className="fill-current" /> Statut : —
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Statut de fidélité et avantages affichés ici une fois disponibles.</p>
                            </div>
                            <Link to="/loyalty" className="text-xs font-bold text-equidex-gold uppercase tracking-wide hover:underline border border-equidex-gold px-4 py-2 inline-block transition-colors hover:bg-equidex-gold hover:text-white">
                                Voir les avantages
                            </Link>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-[#FAFAFA] p-6 border border-gray-100 text-center flex flex-col justify-between h-full">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Progrès vers le Vermeil</p>
                                <h3 className="text-2xl font-serif font-bold text-equidex-gold mb-4">— Pts.</h3>
                                <div className="w-full bg-gray-200 h-1.5 mb-3 rounded-none">
                                    <div className="bg-equidex-gold h-1.5 rounded-none" style={{ width: '0%' }}></div>
                                </div>
                                <p className="text-sm text-gray-500">Objectif : <strong className="text-black">—</strong></p>
                            </div>
                            <p className="text-xs text-gray-400 mt-4">Encore 350 FH pour atteindre le niveau supérieur !</p>
                        </div>

                        {/* Carte Abonnement supprimée */}
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h4 className="text-sm font-bold text-black uppercase tracking-wide mb-4">Derniers Gains de Pts. Ferrure</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-gray-600 border-b border-dotted border-gray-200 pb-2">
                                <PlusCircle className="text-equidex-gold" size={16} />
                                <span>Avis posté : <span className="font-bold text-equidex-gold">+10 FH</span> (Il y a 2 jours)</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 border-b border-dotted border-gray-200 pb-2">
                                <PlusCircle className="text-equidex-gold" size={16} />
                                <span>Connexion quotidienne : <span className="font-bold text-equidex-gold">+1 FH</span> (Aujourd'hui)</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600">
                                <PlusCircle className="text-equidex-gold" size={16} />
                                <span>Profil complété : <span className="font-bold text-equidex-gold">+50 FH</span> (Il y a 5 jours)</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section: Activity */}
                <section className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm mb-8">
                    <h2 className="text-xl font-serif text-equidex-gold mb-6 flex items-center gap-2">
                        Votre Engagement
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border border-gray-100 text-center hover:shadow-md transition-all duration-300 group">
                            <div className="text-equidex-gold mb-4 flex justify-center transform group-hover:scale-110 transition-transform">
                                <Star size={32} strokeWidth={1} />
                            </div>
                            <h3 className="font-bold text-lg text-black mb-2">Avis et Contributions</h3>
                            <p className="text-sm text-gray-600 mb-6">Vous avez posté <strong>12 Avis Écuries</strong> au total.</p>
                            <Link to="/directory" className="text-xs font-bold text-equidex-gold uppercase tracking-wide border-b border-equidex-gold pb-0.5 hover:text-black hover:border-black transition-all">
                                Laisser un avis
                            </Link>
                        </div>

                        <div className="p-6 border border-gray-100 text-center hover:shadow-md transition-all duration-300 group">
                            <div className="text-equidex-gold mb-4 flex justify-center transform group-hover:scale-110 transition-transform">
                                <Award size={32} strokeWidth={1} />
                            </div>
                            <h3 className="font-bold text-lg text-black mb-2">Badges Débloqués</h3>
                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                <span className="px-2 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wide">Confirmé</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wide">Lecteur</span>
                                <span className="px-2 py-1 bg-equidex-gold text-white text-[10px] font-bold uppercase tracking-wide">Ambassadeur</span>
                            </div>
                            <Link to="#" className="text-xs font-bold text-equidex-gold uppercase tracking-wide border-b border-equidex-gold pb-0.5 hover:text-black hover:border-black transition-all">
                                Voir ma collection
                            </Link>
                        </div>

                        <div className="bg-black p-6 text-white text-center relative overflow-hidden group cursor-pointer">
                            <div className="relative z-10">
                                <div className="text-white mb-4 flex justify-center">
                                    <ShoppingBag size={32} strokeWidth={1} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-equidex-gold">Marketplace</h3>
                                <p className="text-sm text-gray-400 mb-6">La Marketplace arrive bientôt. Soyez prêt à vendre.</p>
                                <Button variant="secondary" className="w-full justify-center text-xs py-2 border-white text-white hover:bg-white hover:text-black">
                                    Créer un brouillon
                                </Button>
                            </div>
                            {/* Subtle Gold Glow */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-equidex-gold rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        </div>
                    </div>
                </section>

                {/* Section: Recommendations */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Blog */}
                    <div className="bg-white p-6 rounded-none border border-gray-200">
                        <h4 className="font-bold text-black text-sm uppercase tracking-wide mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                             <BookOpen size={16} className="text-equidex-gold" /> Pour Vous : Blog
                        </h4>
                        <ul className="space-y-4 mb-6">
                            <li>
                                <Link to="/blog" className="block text-sm text-gray-600 hover:text-equidex-gold transition-colors">
                                    <span className="font-serif italic block mb-1">"Guide : Optimiser la gestion de vos stocks de foin."</span>
                                    <span className="text-xs text-gray-400 uppercase">Lire l'article &rarr;</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="block text-sm text-gray-600 hover:text-equidex-gold transition-colors">
                                    <span className="font-serif italic block mb-1">"Interview exclusive : Le cavalier Kevin Staut."</span>
                                    <span className="text-xs text-gray-400 uppercase">Lire l'article &rarr;</span>
                                </Link>
                            </li>
                        </ul>
                        <Link to="/blog" className="block text-center w-full py-2 border border-equidex-gold text-equidex-gold text-xs font-bold uppercase hover:bg-equidex-gold hover:text-white transition-all">
                            Accéder au Blog
                        </Link>
                    </div>

                    {/* Challenge */}
                    <div className="bg-[#f9f4ea] p-6 border border-[#e7dac2]">
                        <h4 className="font-bold text-[#8C7853] text-sm uppercase tracking-wide mb-4 border-b border-[#e7dac2] pb-2 flex items-center gap-2">
                             <Trophy size={16} /> Challenge du Mois
                        </h4>
                        <div className="mb-6">
                            <p className="font-bold text-black font-serif text-lg mb-1">Challenge de l'Avis</p>
                            <p className="text-sm text-[#8C7853]">3/5 avis laissés = <span className="font-bold">100 FH Bonus</span> !</p>
                        </div>
                        <Link to="#" className="block text-center w-full py-2 bg-[#8C7853] text-white text-xs font-bold uppercase hover:bg-[#6b5b3f] transition-all">
                            Voir les challenges
                        </Link>
                    </div>

                    {/* Quick Settings */}
                    <div className="bg-white p-6 border border-gray-200">
                        <h4 className="font-bold text-black text-sm uppercase tracking-wide mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                             <Settings size={16} className="text-equidex-gold" /> Paramètres Rapides
                        </h4>
                        <div className="flex flex-col gap-0 divide-y divide-gray-50">
                            <Link to="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-black py-3 transition-colors group">
                                <Key size={16} className="text-gray-400 group-hover:text-equidex-gold" /> Changer mot de passe
                            </Link>
                            <Link to="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-black py-3 transition-colors group">
                                <Bell size={16} className="text-gray-400 group-hover:text-equidex-gold" /> Notifications
                            </Link>
                            <Link to="#" className="flex items-center gap-3 text-sm text-gray-600 hover:text-black py-3 transition-colors group">
                                <Database size={16} className="text-gray-400 group-hover:text-equidex-gold" /> Mes données
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};
