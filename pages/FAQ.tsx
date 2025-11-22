
import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

type Category = 'general' | 'cavaliers' | 'pros' | 'loyalty';

interface FAQItem {
    question: string;
    answer: React.ReactNode;
    category: Category;
}

const FAQ_DATA: FAQItem[] = [
    // GÉNÉRAL
    {
        category: 'general',
        question: "Qu'est-ce que The EquiDex ?",
        answer: "The EquiDex est la première plateforme digitale premium dédiée à l'art de vivre équestre. Nous connectons les passionnés avec une sélection rigoureuse d'écuries, proposons des contenus experts via notre blog, et offrons des services exclusifs via notre programme de fidélité."
    },
    {
        category: 'general',
        question: "L'accès à la plateforme est-il payant ?",
        answer: "L'accès à l'annuaire, au blog (articles standards) et la création d'un compte Cavalier sont entièrement gratuits. Certains articles approfondis et services spécifiques sont réservés aux membres ayant atteint un certain statut de fidélité ou aux abonnés."
    },
    {
        category: 'general',
        question: "Qui est EquiBot ?",
        answer: "EquiBot est notre assistant intelligent basé sur l'IA. Disponible 24/7, il répond à vos questions sur les soins, l'équipement, la réglementation et vous aide à naviguer sur la plateforme."
    },

    // CAVALIERS
    {
        category: 'cavaliers',
        question: "Comment contacter une écurie ?",
        answer: "Sur la fiche détaillée de chaque écurie, vous trouverez un bouton 'Contacter'. Vous pouvez également voir leurs coordonnées téléphoniques et email directement si vous êtes connecté."
    },
    {
        category: 'cavaliers',
        question: "Puis-je laisser un avis sur un établissement ?",
        answer: "Oui, si vous possédez un compte Cavalier vérifié. Nous encourageons les avis constructifs pour aider la communauté. Chaque avis validé par notre modération vous rapporte des Points Ferrure."
    },
    {
        category: 'cavaliers',
        question: "Comment modifier mes informations personnelles ?",
        answer: "Rendez-vous dans votre Tableau de Bord Cavalier, section 'Paramètres' pour mettre à jour votre profil, changer votre mot de passe ou gérer vos préférences de notification."
    },

    // PROFESSIONNELS
    {
        category: 'pros',
        question: "Comment référencer mon écurie sur The EquiDex ?",
        answer: "Cliquez sur 'Créer un compte Professionnel' lors de l'inscription. Une fois votre compte créé, vous pourrez remplir la fiche de votre établissement. Une vérification sera effectuée avant publication."
    },
    {
        category: 'pros',
        question: "Quels sont les avantages de l'offre Premium ?",
        answer: "L'offre Premium permet à votre établissement d'apparaître en tête des résultats de recherche, d'afficher un badge 'Premium', d'accéder aux statistiques détaillées de votre page et d'ajouter un nombre illimité de photos."
    },
    {
        category: 'pros',
        question: "Puis-je répondre aux avis laissés sur ma fiche ?",
        answer: "Absolument. Vous disposez d'un droit de réponse professionnel via votre Tableau de Bord pour chaque avis publié sur votre page."
    },

    // FIDÉLITÉ (ÉPERON D'OR)
    {
        category: 'loyalty',
        question: "Comment gagner des Points Ferrure (FH) ?",
        answer: "Vous gagnez des points en complétant votre profil, en laissant des avis, en vous connectant régulièrement (série de 7 jours) ou en parrainant des amis. Consultez la page 'Fidélité' pour le barème complet."
    },
    {
        category: 'loyalty',
        question: "Mes points ont-ils une date d'expiration ?",
        answer: "Oui, les Points Ferrure sont valables sur une période glissante de 24 mois. Une inactivité prolongée peut entraîner une perte de statut."
    },
    {
        category: 'loyalty',
        question: "À quoi sert le statut 'Vermeil' ou 'Or' ?",
        answer: "Ces statuts débloquent des privilèges exclusifs : accès illimité aux articles experts, invitations à des événements privés (Galas, Ventes), réductions chez nos partenaires de luxe (Hermès, etc.) et un service de conciergerie."
    }
];

export const FAQ: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('general');
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = FAQ_DATA.filter(item => {
        const matchesCategory = activeCategory === item.category;
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (typeof item.answer === 'string' && item.answer.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Si recherche active, on ignore la catégorie, sinon on filtre par catégorie
        return searchTerm ? matchesSearch : matchesCategory;
    });

    const categories: { id: Category; label: string }[] = [
        { id: 'general', label: 'Général' },
        { id: 'cavaliers', label: 'Espace Cavalier' },
        { id: 'pros', label: 'Espace Pro' },
        { id: 'loyalty', label: 'Club Éperon d\'Or' },
    ];

    return (
        <div className="min-h-screen bg-white font-serif text-slate-900 pb-20">
            
            {/* Hero Header */}
            <div className="bg-slate-50 py-16 border-b border-gray-200">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-equidex-dark">Centre d'Aide</h1>
                    <p className="text-lg text-gray-600 mb-10 font-sans font-light">
                        Vous avez des questions sur The EquiDex ? Nous avons les réponses.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Rechercher une question (ex: points, abonnement...)"
                            className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all font-sans text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                
                {/* Category Filters (Hidden if searching) */}
                {!searchTerm && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setActiveCategory(cat.id); setOpenIndex(null); }}
                                className={`px-6 py-3 rounded-none text-sm uppercase tracking-widest font-bold transition-all border-b-2 ${
                                    activeCategory === cat.id 
                                        ? 'border-amber-600 text-amber-600 bg-amber-50' 
                                        : 'border-transparent text-gray-500 hover:text-slate-900 hover:bg-gray-50'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Accordion List */}
                <div className="space-y-4">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <div key={index} className={`border border-gray-200 rounded-lg transition-all duration-300 ${openIndex === index ? 'shadow-md border-amber-200 bg-white' : 'bg-white hover:border-gray-300'}`}>
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                >
                                    <span className={`font-bold text-lg ${openIndex === index ? 'text-amber-800' : 'text-slate-800'}`}>
                                        {item.question}
                                    </span>
                                    <ChevronDown 
                                        size={20} 
                                        className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === index ? 'rotate-180 text-amber-600' : ''}`} 
                                    />
                                </button>
                                
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 pt-0 text-gray-600 font-sans leading-relaxed border-t border-transparent">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-gray-300">
                            <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-sans">Aucun résultat trouvé pour "{searchTerm}".</p>
                            <button onClick={() => setSearchTerm('')} className="text-amber-600 font-bold mt-2 hover:underline font-sans text-sm">
                                Voir toutes les questions
                            </button>
                        </div>
                    )}
                </div>

                {/* Contact CTA */}
                <div className="mt-20 bg-slate-900 text-white p-10 rounded-xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                    
                    <div className="relative z-10">
                        <MessageCircle size={48} className="mx-auto mb-6 text-amber-500" />
                        <h3 className="text-2xl font-bold font-serif mb-3">Vous ne trouvez pas votre réponse ?</h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto font-sans font-light">
                            Notre équipe support est disponible du lundi au vendredi pour vous accompagner personnellement.
                        </p>
                        <Link to="/contact">
                            <Button variant="primary" className="bg-amber-600 border-amber-600 hover:bg-amber-700 hover:border-amber-700 text-white px-8 py-4">
                                Contacter le Support
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};
