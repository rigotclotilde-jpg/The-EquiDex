
import React, { useState } from 'react';
import { Shield, Star, Gem, Crown, UserCheck, MessageSquare, Share2, Calendar, UserPlus, Flag, Check, ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const Loyalty: React.FC = () => {
    return (
        <div className="bg-white min-h-screen font-serif text-slate-900">
            
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0">
                    {/* CHANGEMENT D'IMAGE ICI : Photo de détail (oeil ou mors) très luxe */}
                    <img 
                        src="https://images.unsplash.com/photo-1534016629738-9905f0a4db00?q=80&w=1920&auto=format&fit=crop" 
                        alt="Cheval au galop" 
                        className="w-full h-full object-cover filter brightness-[0.4] contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                </div>
                
                <div className="relative z-10 px-4 max-w-4xl mx-auto animate-fade-in">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-4 flex items-center justify-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-500"></span>
                        Programme Privilège
                        <span className="w-8 h-[1px] bg-amber-500"></span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
                        Le Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">Éperon d'Or</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                        Rejoignez un cercle d'initiés. Cumulez des <span className="text-amber-400 font-medium">Points Ferrure (FH)</span> et accédez à des privilèges exclusifs réservés à l'élite équestre.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="primary" className="px-8 py-4 text-sm tracking-widest">
                            Rejoindre le Club
                        </Button>
                        <Button variant="outline" className="px-8 py-4 text-sm tracking-widest border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
                            Connexion Membre
                        </Button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-20 max-w-7xl">
                
                {/* Tiers Section */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Les Niveaux de Prestige</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Votre fidélité est récompensée par un statut évolutif. Plus vous vous engagez, plus les avantages deviennent exceptionnels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Bronze Tier */}
                        <TierCard 
                            title="BRONZE"
                            color="#CD7F32" // Bronze Hex
                            icon={<Shield size={48} strokeWidth={1} />}
                            points="0 - 250 FH"
                            benefits={[
                                "Accès Standard à l'Annuaire",
                                "Possibilité d'Évaluer les Écuries",
                                "Newsletter Exclusive"
                            ]}
                            cta="Se Connecter"
                            ctaVariant="primary"
                        />

                        {/* Silver Tier */}
                        <TierCard 
                            title="ARGENT"
                            color="#A0A0A0" // Silver Hex
                            icon={<Star size={48} strokeWidth={1} />}
                            points="251 - 750 FH"
                            benefits={[
                                "Badge de Confiance sur le Profil",
                                "1 Article Premium offert / mois",
                                "Accès prioritaire au Support"
                            ]}
                            cta="Atteindre"
                            ctaVariant="outline"
                        />

                        {/* Vermeil Tier */}
                        <TierCard 
                            title="VERMEIL"
                            color="#A38C62" // EquiDex Gold Hex
                            icon={<Gem size={48} strokeWidth={1} />}
                            points="751 - 1500 FH"
                            benefits={[
                                "Accès illimité aux Articles Premium",
                                "10% de Réduction Partenaires",
                                "Invitations Événements Locaux"
                            ]}
                            cta="Atteindre"
                            ctaVariant="outline"
                            isHighlight
                        />

                        {/* Gold Tier */}
                        <TierCard 
                            title="OR"
                            color="#D4AF37" // True Metallic Gold Hex
                            icon={<Crown size={48} strokeWidth={1} />}
                            points="1500+ FH"
                            benefits={[
                                "Statut Ambassadeur",
                                "Invitations Événements Privés (Gala)",
                                "Service de Conciergerie Équestre",
                                "Cadeau d'Anniversaire de Luxe"
                            ]}
                            cta="Niveau Ultime"
                            ctaVariant="outline"
                        />
                    </div>
                </section>

                {/* Earning Table Section */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                    <div className="lg:col-span-1">
                        <h3 className="text-3xl font-bold mb-6 text-slate-900">Comment gagner des Points Ferrure (FH) ?</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Chaque interaction sur The EquiDex vous rapproche du niveau supérieur. Nous valorisons la qualité de vos contributions et votre engagement au sein de la communauté.
                        </p>
                        <div className="bg-amber-50 p-6 border border-amber-100 rounded-none">
                            <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                                <Star className="fill-amber-600 text-amber-600" size={18} /> Le Saviez-vous ?
                            </h4>
                            <p className="text-sm text-amber-900/80">
                                Les points sont valables 24 mois glissants. Maintenez votre activité pour conserver votre statut d'élite.
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="overflow-hidden border border-gray-200 shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-zinc-900 text-white">
                                    <tr>
                                        <th className="p-5 font-sans font-bold text-sm uppercase tracking-wider">Action</th>
                                        <th className="p-5 font-sans font-bold text-sm uppercase tracking-wider text-right">Gain (FH)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 font-sans text-sm">
                                    <EarningRow 
                                        icon={<UserCheck className="text-amber-600" size={20} />}
                                        action="Compléter son Profil à 100%"
                                        reward="50 FH"
                                        note="Bonus unique"
                                    />
                                    <EarningRow 
                                        icon={<MessageSquare className="text-amber-600" size={20} />}
                                        action="Poster un Avis Validé (vérifié par modération)"
                                        reward="10 FH"
                                        note="/ avis"
                                    />
                                    <EarningRow 
                                        icon={<Share2 className="text-amber-600" size={20} />}
                                        action="Partager un Article sur les réseaux sociaux"
                                        reward="5 FH"
                                        note="Max. 50 FH / mois"
                                    />
                                    <EarningRow 
                                        icon={<Calendar className="text-amber-600" size={20} />}
                                        action="Série de Connexion (7 jours consécutifs)"
                                        reward="25 FH"
                                        note="Bonus Hebdomadaire"
                                    />
                                    <EarningRow 
                                        icon={<UserPlus className="text-amber-600" size={20} />}
                                        action="Parrainage d'un nouveau membre actif"
                                        reward="100 FH"
                                        note="Par filleul validé"
                                    />
                                    <EarningRow 
                                        icon={<Flag className="text-amber-600" size={20} />}
                                        action="Signalement d'informations erronées (validé)"
                                        reward="15 FH"
                                        note="/ signalement"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                            <HelpCircle className="text-amber-600" /> Questions Fréquentes
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <FAQItem 
                            question="Mes points expirent-ils ?" 
                            answer="Oui, vos Points Ferrure sont valables sur une période de 24 mois glissants. Pour conserver votre statut, vous devez maintenir un niveau d'activité régulier." 
                        />
                        <FAQItem 
                            question="Comment accéder aux ventes privées ?" 
                            answer="Les accès aux ventes privées sont envoyés par email aux membres de statut Argent et supérieur, 48h avant l'ouverture publique." 
                        />
                        <FAQItem 
                            question="Puis-je acheter des points ?" 
                            answer="Non, le programme Éperon d'Or récompense exclusivement l'engagement et la fidélité. Les points ne peuvent être ni achetés ni transférés." 
                        />
                    </div>
                </section>

            </div>
        </div>
    );
};

// --- Sub Components ---

const TierCard: React.FC<{ 
    title: string; 
    color: string; 
    icon: React.ReactNode; 
    points: string; 
    benefits: string[]; 
    cta: string; 
    ctaVariant: 'primary' | 'outline';
    isHighlight?: boolean;
}> = ({ title, color, icon, points, benefits, cta, ctaVariant, isHighlight }) => {
    return (
        <div 
            className={`bg-white p-8 border flex flex-col transition-all duration-300 hover:-translate-y-2 relative group ${isHighlight ? 'shadow-xl border-amber-200 z-10' : 'shadow-sm border-gray-100 hover:shadow-md'}`}
            style={{ borderTopColor: color, borderTopWidth: '4px' }}
        >
            {isHighlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-sm">
                    Le Plus Populaire
                </div>
            )}
            
            <div className="flex justify-center mb-6 transition-transform group-hover:scale-110" style={{ color: color }}>
                {icon}
            </div>
            
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-serif mb-2" style={{ color: color }}>{title}</h3>
                <span className="inline-block bg-gray-50 px-3 py-1 rounded text-xs font-bold text-gray-500 uppercase tracking-wide">
                    {points}
                </span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: color }} />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>

            <Button 
                variant={ctaVariant} 
                className={`w-full justify-center ${ctaVariant === 'outline' ? 'hover:bg-gray-50' : ''}`}
                // Quick hack to apply dynamic border color for outline buttons
                style={ctaVariant === 'outline' ? { borderColor: color, color: color } : { backgroundColor: color, borderColor: color }}
            >
                {cta}
            </Button>
        </div>
    );
};

const EarningRow: React.FC<{ icon: React.ReactNode; action: string; reward: string; note: string }> = ({ icon, action, reward, note }) => (
    <tr className="hover:bg-amber-50/40 transition-colors group border-b border-gray-50 last:border-0">
        <td className="p-5 flex items-center gap-4">
            <div className="p-2 bg-gray-50 rounded group-hover:bg-white transition-colors">
                {icon}
            </div>
            <span className="font-medium text-slate-700 group-hover:text-amber-800 transition-colors">{action}</span>
        </td>
        <td className="p-5 text-right">
            <div className="font-bold text-amber-700 text-lg">{reward}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">{note}</div>
        </td>
    </tr>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="border border-gray-200 rounded-none overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 text-left transition-colors"
            >
                <span className="font-bold text-slate-800">{question}</span>
                <ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`bg-gray-50 px-5 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};
