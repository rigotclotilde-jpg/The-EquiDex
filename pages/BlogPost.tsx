
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
    Share2, Clock, Calendar, 
    Facebook, Twitter, Linkedin, Mail,
    ExternalLink, ChevronDown, Quote, Lock, Unlock, AlertCircle
} from 'lucide-react';
import { Button } from '../components/Button';
import { BLOG_POSTS_DATA } from '../data/mockData';
import { useUserContext } from '../context/UserContext';

// --- Sub-Components ---

const AccordionItem: React.FC<{ title: string; image?: string; content: { label: string; text: string }[] }> = ({ title, image, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border rounded-lg mb-6 overflow-hidden transition-all duration-300 shadow-sm ${isOpen ? 'border-amber-500 shadow-md' : 'border-gray-200'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                aria-expanded={isOpen}
            >
                <strong className="font-serif text-lg text-slate-800">{title}</strong>
                <ChevronDown size={20} className={`text-amber-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`bg-white transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-5">
                    {image && (
                        <div className="mb-5 rounded-lg overflow-hidden shadow-sm">
                            <img src={image} alt={title} className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                    )}
                    {content.map((item: any, idx: number) => (
                        <div key={idx} className="mb-4 last:mb-0 text-gray-600 text-sm leading-relaxed">
                            <strong className="text-amber-700 block mb-1 font-sans uppercase tracking-wide text-xs">{item.label}</strong>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StandardArticleContent: React.FC<{ content: { title: string; text: string }[] }> = ({ content }) => (
    <div className="animate-fade-in space-y-8">
        {content.map((section, idx) => (
            <div key={idx}>
                <h2 className="text-2xl font-bold text-amber-800 mb-4 border-l-4 border-amber-600 pl-4">
                    {section.title}
                </h2>
                {/* Updated to support HTML content for rich text formatting */}
                <div 
                    className="text-gray-700 leading-relaxed [&>h4]:font-bold [&>h4]:text-lg [&>h4]:mt-6 [&>h4]:mb-3 [&>h4]:text-slate-900 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul]:space-y-2 [&>p]:mb-4"
                    dangerouslySetInnerHTML={{ __html: section.text }} 
                />
            </div>
        ))}
    </div>
);

interface PremiumLockProps {
    isLoggedIn: boolean;
    points: number;
    cost: number;
    onUnlock: () => void;
}

const PremiumLock: React.FC<PremiumLockProps> = ({ isLoggedIn, points, cost, onUnlock }) => (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-white">
                <Lock size={32} className="text-amber-700" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Article Premium</h3>
            
            {!isLoggedIn ? (
                <>
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                        Ce contenu est réservé à nos membres. Connectez-vous pour utiliser vos Points Ferrure (FH) et accéder à l'intégralité de l'article.
                    </p>
                    <Link to="/auth">
                        <Button className="w-full justify-center py-3 text-sm tracking-widest uppercase font-bold shadow-lg shadow-amber-500/20">
                            Se Connecter
                        </Button>
                    </Link>
                </>
            ) : (
                <>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        Débloquez cet article d'expertise pour <strong>{cost} FH</strong>.
                    </p>
                    <div className="bg-slate-50 border border-gray-200 rounded-lg p-3 mb-6 flex justify-between items-center text-sm">
                        <span className="text-gray-500">Votre solde :</span>
                        <span className="font-bold text-amber-700">{points} FH</span>
                    </div>

                    {points >= cost ? (
                        <Button onClick={onUnlock} className="w-full justify-center py-3 text-sm tracking-widest uppercase font-bold shadow-lg shadow-amber-500/20 gap-2">
                            <Unlock size={16} /> Débloquer (-{cost} FH)
                        </Button>
                    ) : (
                        <div className="space-y-3">
                            <Button disabled className="w-full justify-center py-3 text-sm tracking-widest uppercase font-bold opacity-50 cursor-not-allowed">
                                Solde Insuffisant
                            </Button>
                            <p className="text-xs text-red-500 flex items-center justify-center gap-1">
                                <AlertCircle size={12} /> Il vous manque {cost - points} FH.
                            </p>
                        </div>
                    )}
                </>
            )}
            
            <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100">
                L'excellence équestre à portée de clic.
            </p>
        </div>
    </div>
);

// --- Main Component ---

export const BlogPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState<'majors' | 'cso' | 'cce' | 'autres'>('majors');
    
    // Contexte Utilisateur
    const { user, unlockedArticles, unlockArticle } = useUserContext();

    // Utilisation des données centralisées
    const article = BLOG_POSTS_DATA[id || '9'] || BLOG_POSTS_DATA['9'];

    // Vérification si l'article est verrouillé
    const isLocked = article.isPremium && !unlockedArticles.includes(article.id);
    const UNLOCK_COST = 10;

    return (
        <div className="bg-white min-h-screen pb-12 font-serif text-slate-900">
            
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-8 pb-4">
                <div className="text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Link to="/" className="hover:text-amber-600 transition-colors">Accueil</Link> &gt; 
                    <Link to="/blog" className="hover:text-amber-600 transition-colors">Blog</Link> &gt; 
                    <span className="text-amber-600 truncate max-w-[200px]">{article.category}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl">
                
                {/* Main Content (3 Cols) */}
                <article className="lg:col-span-3">
                    
                    {/* Header Meta */}
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight border-b-4 border-amber-600 pb-6 inline-block text-slate-900">
                            {article.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-xs font-sans">LR</div>
                                <span className="font-sans uppercase tracking-wide text-xs font-bold">La Rédaction</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-amber-600" />
                                <span className="font-sans">{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-amber-600" />
                                <span className="font-sans">Lecture : 8 min</span>
                            </div>
                            {article.isPremium && (
                                <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                    Premium
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Intro */}
                    <div 
                        className="text-xl text-slate-700 font-light italic mb-12 pl-8 border-l-4 border-amber-600 py-2 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.intro }}
                    />

                    {/* Dynamic Content Rendering with Lock Logic */}
                    <div className="mt-10 relative">
                        
                        {/* Overlay Wrapper for Locking */}
                        {isLocked && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white z-10"></div>
                                <PremiumLock 
                                    isLoggedIn={!!user}
                                    points={user?.points || 0}
                                    cost={UNLOCK_COST}
                                    onUnlock={() => unlockArticle(article.id, UNLOCK_COST)}
                                />
                            </>
                        )}
                        
                        {/* The Actual Content (Blurred if Locked) */}
                        <div className={`${isLocked ? 'blur-sm select-none h-[400px] overflow-hidden' : ''} transition-all duration-500`}>
                            
                            {/* TYPE: STANDARD */}
                            {article.type === 'standard' && (
                                <StandardArticleContent content={article.content} />
                            )}

                            {/* TYPE: ACCORDION (Maintenance) */}
                            {article.type === 'accordion' && (
                                <div className="animate-fade-in">
                                    
                                    {article.expert && (
                                        <div className="bg-slate-50 border-l-4 border-slate-800 p-6 mb-10 rounded-r-lg shadow-sm">
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                                                <Quote size={16} className="text-amber-600" /> L'Œil de l'Expert
                                            </h4>
                                            <p className="text-slate-700 italic font-medium leading-relaxed">
                                                "{article.expert}"
                                            </p>
                                        </div>
                                    )}

                                    <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center gap-2 border-l-4 border-amber-600 pl-4">
                                        Guide des Outils Indispensables
                                    </h2>
                                    <p className="mb-8 text-gray-700 leading-relaxed">
                                        Cliquez sur chaque catégorie d'outil ci-dessous pour découvrir son rôle, ses spécificités techniques et voir à quoi il ressemble.
                                    </p>
                                    <div className="space-y-2">
                                        {article.content.map((item: any, idx: number) => (
                                            <AccordionItem key={idx} title={item.title} image={item.image} content={item.body} />
                                        ))}
                                    </div>

                                    {/* Ad Banner (Mid-Article) */}
                                    <div className="mt-12 bg-[#FFFBEA] border border-amber-200 rounded-lg p-6 text-center shadow-sm">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-widest">Publicité</p>
                                        <a href="https://www.hermes.com/fr/fr/sellerie/" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-serif font-bold text-slate-800 hover:text-amber-700 transition-colors flex items-center justify-center gap-2">
                                            Découvrez la collection de sellerie de luxe <span className="text-amber-600">Hermès</span>
                                            <ExternalLink size={18} />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* TYPE: TABS (Competitions) */}
                            {article.type === 'tabs' && (
                                <>
                                    {/* Tab Navigation */}
                                    <div className="flex flex-wrap border-b border-gray-200 mb-8">
                                        {['majors', 'cso', 'cce', 'autres'].map((tab) => (
                                            <button 
                                                key={tab}
                                                onClick={() => setActiveTab(tab as any)}
                                                className={`px-6 py-4 font-bold text-sm uppercase tracking-wider transition-all relative ${
                                                    activeTab === tab 
                                                        ? 'text-amber-600' 
                                                        : 'text-gray-500 hover:text-gray-800'
                                                }`}
                                            >
                                                {tab === 'majors' ? 'I. Sommet' : tab === 'cso' ? 'II. CSO' : tab === 'cce' ? 'III. CCE' : 'IV. Autres'}
                                                {activeTab === tab && (
                                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-600"></span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="animate-fade-in">
                                        {/* Dynamic Tab Image */}
                                        <div className="relative h-64 rounded-xl overflow-hidden mb-8 shadow-lg">
                                            <img 
                                                src={article.content[activeTab].image} 
                                                alt={article.content[activeTab].title} 
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                                                <div>
                                                    <h2 className="text-white text-2xl font-bold font-serif mb-2">
                                                        {article.content[activeTab].title}
                                                    </h2>
                                                    <p className="text-gray-200 text-sm max-w-2xl">
                                                        {article.content[activeTab].desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Expert Insight */}
                                        <div className="bg-slate-50 border-l-4 border-slate-800 p-6 mb-8 rounded-r-lg">
                                            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                                <Quote size={16} className="text-amber-600" /> L'Œil de l'Expert
                                            </h4>
                                            <p className="text-slate-700 italic font-medium">
                                                "{article.content[activeTab].expert}"
                                            </p>
                                        </div>

                                        {/* Data Table */}
                                        <div className="overflow-hidden rounded-xl shadow-sm border border-gray-200 mb-8">
                                            <table className="w-full text-sm text-left border-collapse font-sans">
                                                <thead className="bg-slate-900 text-white">
                                                    <tr>
                                                        <th className="p-4 font-bold text-center w-16 uppercase text-xs tracking-wider text-amber-500">Rang</th>
                                                        <th className="p-4 font-bold uppercase text-xs tracking-wider">Compétition</th>
                                                        {activeTab === 'majors' && <th className="p-4 font-bold uppercase text-xs tracking-wider">Fréquence</th>}
                                                        {activeTab !== 'majors' && <th className="p-4 font-bold uppercase text-xs tracking-wider">Lieu</th>}
                                                        <th className="p-4 font-bold uppercase text-xs tracking-wider hidden md:table-cell">
                                                            {activeTab === 'cso' ? 'Partenaire' : 'Distinction'}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-100 bg-white">
                                                    {article.content[activeTab].data.map((row: any) => (
                                                        <tr key={row.id} className="hover:bg-amber-50/30 transition-colors group">
                                                            <td className="p-4 text-center">
                                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-bold text-xs group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                                                    {row.id}
                                                                </span>
                                                            </td>
                                                            <td className="p-4">
                                                                <span className="font-serif font-bold text-slate-800 text-base block">{row.name}</span>
                                                                <span className="text-xs text-gray-500 md:hidden">{row.prestige || row.feat}</span>
                                                            </td>
                                                            {activeTab === 'majors' && <td className="p-4 text-gray-600">{row.freq}</td>}
                                                            {activeTab !== 'majors' && <td className="p-4 text-gray-600">{row.loc || row.disc}</td>}
                                                            <td className="p-4 hidden md:table-cell">
                                                                {activeTab === 'cso' ? (
                                                                    <span className={`font-bold ${row.sponsorColor}`}>{row.sponsor}</span>
                                                                ) : (
                                                                    <span className="text-gray-500 italic">{row.prestige || row.feat}</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </article>

                {/* Sidebar (1 Col) */}
                <aside className="lg:col-span-1 space-y-8">
                    
                    {/* Share */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-amber-600 mb-4 border-b border-gray-100 pb-2">
                            Partager
                        </h3>
                        <div className="flex gap-2">
                            <button aria-label="Partager sur Facebook" className="w-10 h-10 bg-[#3b5998] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"><Facebook size={18} /></button>
                            <button aria-label="Partager sur Twitter" className="w-10 h-10 bg-[#55acee] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"><Twitter size={18} /></button>
                            <button aria-label="Partager sur LinkedIn" className="w-10 h-10 bg-[#007bb5] text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"><Linkedin size={18} /></button>
                            <button aria-label="Partager par mail" className="w-10 h-10 bg-gray-500 text-white flex items-center justify-center rounded-full hover:opacity-90 transition-opacity"><Mail size={18} /></button>
                        </div>
                    </div>

                    {/* Related Articles */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-amber-600 mb-4 border-b border-gray-100 pb-2">
                            À Lire Aussi
                        </h3>
                        <div className="flex flex-col gap-4">
                            {article.id === '8' ? (
                                <Link to="/blog/9" className="group block">
                                    <p className="text-xs text-gray-400 mb-1 uppercase font-sans">Compétition</p>
                                    <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
                                        Top 20 des Compétitions Mondiales
                                    </h4>
                                </Link>
                            ) : (
                                <Link to="/blog/8" className="group block">
                                    <p className="text-xs text-gray-400 mb-1 uppercase font-sans">Infrastructures</p>
                                    <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
                                        Guide des Outils d'Entretien
                                    </h4>
                                </Link>
                            )}
                            <Link to="/blog/3" className="group block border-t border-gray-100 pt-4">
                                <p className="text-xs text-gray-400 mb-1 uppercase font-sans">Bien-être</p>
                                <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors">
                                    L'Écurie Active : Concept et Avantages
                                </h4>
                            </Link>
                        </div>
                    </div>
                    


                </aside>
            </div>
        </div>
    );
};
