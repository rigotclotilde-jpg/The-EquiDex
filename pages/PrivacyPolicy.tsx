
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Shield, Info } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-equidex-dark">Politique de Confidentialité</h1>
                    <p className="text-gray-500 italic font-sans text-sm">
                        Votre confidentialité est importante pour nous
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                
                <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-12 rounded-none">
                    
                    <div className="prose prose-slate max-w-none font-sans text-gray-600 leading-relaxed">
                        
                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <Shield className="text-amber-600" size={24} /> Préambule
                            </h2>
                            <p>
                                Le site web <strong>The EquiDex</strong> utilise uniquement des cookies exemptés de consentement, comme ceux nécessaires au bon fonctionnement du site (par exemple, pour garder en mémoire le contenu d’un panier d’achat).
                            </p>
                            <p>
                                Toutefois, des réglages de votre navigateur peuvent vous permettre de les bloquer, bien que cela puisse avoir des effets potentiellement négatifs sur le fonctionnement du site.
                            </p>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <Cookie className="text-amber-600" size={24} /> Les cookies exemptés de consentement
                            </h2>
                            <p className="mb-4">
                                Conformément aux recommandations de la CNIL, certains traceurs sont dispensés du recueil de consentement. Voici la liste des cookies que nous sommes susceptibles d'utiliser dans ce cadre :
                            </p>
                            
                            <ul className="space-y-4 list-none pl-0 mt-6">
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Les cookies conservant le choix exprimé par les utilisateurs sur le dépôt de cookies ;</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Les cookies destinés à l’authentification auprès d’un service, y compris ceux visant à assurer la sécurité du mécanisme d’authentification, par exemple en limitant les tentatives d’accès robotisées ou inattendues ;</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Les cookies destinés à garder en mémoire le contenu d’un panier d’achat sur un site marchand ou à facturer, à l’utilisateur, le(s) produit(s) et/ou service(s) acheté(s) ;</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Les cookies de personnalisation de l'interface utilisateur (par exemple, pour le choix de la langue ou de la présentation d’un service), lorsqu’une telle personnalisation constitue un élément intrinsèque et attendu du service ;</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Les cookies permettant l'équilibrage de la charge des équipements concourant à un service de communication ;</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Les cookies permettant aux sites payants de limiter l’accès gratuit à un échantillon de contenu demandé par les utilisateurs (quantité prédéfinie et/ou sur une période limitée) ;</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <Info size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                                    <span>Certains cookies de mesure d’audience dès lors qu’ils respectent certaines conditions strictes de confidentialité.</span>
                                </li>
                            </ul>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};
