
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ShieldCheck, CreditCard, Truck, AlertCircle } from 'lucide-react';

export const CGV: React.FC = () => {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-equidex-dark">Conditions Générales de Vente</h1>
                    <p className="text-gray-500 italic font-sans text-sm">
                        Dernière mise à jour : 01 Janvier 2025
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                
                <div className="bg-white border border-gray-100 shadow-sm p-8 md:p-12 rounded-none">
                    
                    <div className="prose prose-slate max-w-none font-sans text-gray-600 leading-relaxed">
                        
                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <FileText className="text-amber-600" size={24} /> 1. Champ d'application
                            </h2>
                            <p>
                                Les présentes Conditions Générales de Vente (ci-après "CGV") s'appliquent, sans restriction ni réserve à l'ensemble des ventes conclues par la société THE EQUIDEX auprès d'acheteurs non professionnels ("Les Clients" ou "le Client"), désirant acquérir les produits et services proposés à la vente sur le site www.the-equidex.com.
                            </p>
                            <p>
                                Ces CGV sont accessibles à tout moment sur ce site Internet et prévaudront sur toute autre version ou tout autre document contradictoire.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <CreditCard className="text-amber-600" size={24} /> 2. Prix et Paiement
                            </h2>
                            <p>
                                Les produits sont fournis aux tarifs en vigueur figurant sur le site lors de l'enregistrement de la commande. Les prix sont exprimés en Euros et TTC.
                            </p>
                            <p>
                                Le paiement est exigible immédiatement à la commande. Le Client peut effectuer le règlement par carte bancaire (Visa, MasterCard, American Express) ou via les services de paiement sécurisés proposés sur la plateforme (Stripe, PayPal).
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <Truck className="text-amber-600" size={24} /> 3. Services et Abonnements
                            </h2>
                            <p>
                                Pour les services souscrits sous forme d'abonnement (ex: Compte Premium, Programme Fidélité), l'engagement est conclu pour la durée déterminée lors de la commande.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Abonnement Mensuel :</strong> Renouvellement tacite chaque mois. Résiliable à tout moment depuis l'espace client.</li>
                                <li><strong>Abonnement Annuel :</strong> Engagement ferme de 12 mois avec paiement en une fois.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <ShieldCheck className="text-amber-600" size={24} /> 4. Rétractation
                            </h2>
                            <p>
                                Conformément aux dispositions légales en vigueur, le Client dispose d'un délai de quatorze jours à compter de la conclusion du contrat pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité.
                            </p>
                            <p className="bg-slate-50 p-4 border-l-4 border-slate-300 text-sm italic">
                                Exception : Le droit de rétractation ne peut être exercé pour les contenus numériques non fournis sur un support matériel (articles premium, accès immédiat) dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="flex items-center gap-3 text-xl font-serif font-bold text-slate-900 mb-6 uppercase tracking-wide border-b border-amber-100 pb-2">
                                <AlertCircle className="text-amber-600" size={24} /> 5. Responsabilité
                            </h2>
                            <p>
                                The EquiDex agit en tant qu'intermédiaire et fournisseur de contenu. Les produits vendus sur la Marketplace par des tiers sont sous la responsabilité de ces vendeurs tiers. The EquiDex ne saurait être tenue pour responsable des dommages résultant d'une mauvaise utilisation du produit acheté.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-b border-amber-100 pb-2">
                                6. Droit applicable
                            </h2>
                            <p>
                                De convention expresse entre les parties, les présentes Conditions Générales de Vente et les opérations d'achat et de vente qui en découlent sont régies par le droit français.
                            </p>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};
