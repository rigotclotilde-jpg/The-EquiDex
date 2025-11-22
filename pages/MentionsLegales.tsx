
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const MentionsLegales: React.FC = () => {
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
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-equidex-dark">Mentions Légales</h1>
                    <p className="text-gray-500 italic font-sans text-sm">
                        En vigueur au 01/01/2025
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="prose prose-slate max-w-none font-sans text-gray-600 leading-relaxed">
                    
                    {/* Section I */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            I. Préambule
                        </h2>
                        <p>
                            Le site web <strong>www.the-equidex.com</strong> est exploité par la SAS THE EQUIDEX (anciennement Cheval Référence) sous le numéro SIREN 880 933 783.
                        </p>
                        <p>
                            L’adresse de l’entreprise est située au <strong>131 boulevard Carnot, 78110 LE VESINET</strong>.
                        </p>
                        <p>
                            Le Directeur de la publication du site est <strong>Carine El baz</strong>.<br/>
                            Le responsable de la rédaction est <strong>Carine El baz</strong>.
                        </p>
                        <p>
                            Toute notification réalisée en application de l'article 6.I-5 (dernier tiret) de la loi du 21 juin 2004 (loi n°2004-575) doit être réalisée en recommandé avec demande d'avis de réception à l'adresse suivante : 131 boulevard Carnot, 78110 LE VESINET.
                        </p>
                    </section>

                    {/* Section II */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            II. Informatique et Libertés
                        </h2>
                        <p>
                            Le RGPD supprime les déclarations de fichiers à effectuer auprès de la CNIL. En contrepartie de la disparition de l’accomplissement de démarches administratives auprès de la CNIL, les personnes traitant des données à caractère personnel, mais aussi leurs prestataires et sous-traitants, sont désormais pleinement responsables de la protection des données qu’ils traitent. Il leur appartient d’assurer la conformité au RGPD de leurs traitements de données personnelles tout au long de leur cycle de vie et d’être en mesure de démontrer cette conformité.
                        </p>
                    </section>

                    {/* Section III */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            III. Hébergement
                        </h2>
                        <p>
                            Le présent site est hébergé par la société <strong>OVH</strong> (www.ovh.com/fr).
                        </p>
                    </section>

                    {/* Section IV */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            IV. Propriété Intellectuelle
                        </h2>
                        <p>
                            Toute reproduction ou représentation non autorisée des informations de ce site est interdite. Le contenu est disponible pour un usage privé et non collectif. Le code de la propriété intellectuelle n’autorisant, aux termes de l’article L. 122-5.2° et 3°a, d’une part, que les "copies ou reproductions strictement réservées à l’usage privé du copiste et non destinées à une utilisation collective" et, d’autre part, que les analyses et les courtes citations dans un but d’exemple et d’illustration, "toute représentation ou reproduction intégrale ou partielle faite sans le consentement de l’auteur ou de ses ayants droit ou ayants cause est illicite" (art.L.122-4).
                        </p>
                        <p>
                            Cette représentation ou reproduction, par quelque procédé que ce soit constituerait donc une contrefaçon sanctionnée par les articles L. 335-2 et suivants du code de la propriété intellectuelle.
                        </p>
                        <h3 className="font-bold text-slate-800 mt-4 mb-2">Marques et logos</h3>
                        <p>
                            Toute utilisation et/ou reproduction et/ou représentation quelle qu’elle soit des noms de marques et logos de ce site est interdite sans autorisation.
                        </p>
                    </section>

                    {/* Section V */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            V. Hyperliens et Cookies
                        </h2>
                        <p>
                            Les liens hypertextes mis en place dans le cadre du présent site Web en direction d’autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de The EquiDex.
                        </p>
                        <p>
                            Dans le cadre de la consultation du site, des cookies de navigation peuvent être implantés dans l'ordinateur des visiteurs. Un cookie ne permet pas d'identifier le visiteur. En revanche, il enregistre des informations relatives à la navigation de l'ordinateur de l'utilisateur sur le site. L'utilisateur a la possibilité de s'opposer à l'enregistrement de cookies en configurant son navigateur internet en ce sens-là.
                        </p>
                    </section>

                    {/* Section VI */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            VI. Accessibilité
                        </h2>
                        <p>
                            Le site est accessible 24/24 heures et 7/7 jours. Cependant The EquiDex se réserve la possibilité de fermer ou de rendre inaccessible tout ou partie du site pour des opérations notamment de maintenance ou à la demande de toute autorité judiciaire et en cas de force majeure.
                        </p>
                        <p>
                            The EquiDex ne peut en aucun cas être responsable de la non accessibilité du site précité et de toute interruption totale ou partielle de la consultation de ses pages. L'internaute se doit de vérifier qu'il dispose des outils et moyens de communications électroniques et des compétences permettant l'accès au site et la consultation de ces pages. L'internaute reconnaît avoir pris connaissance des présentes mentions légales, les avoir compris et s'engage à les respecter.
                        </p>
                    </section>

                    {/* Section VII */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            VII. Exploitation des Informations
                        </h2>
                        <p>
                            The EquiDex ne peut être tenue responsable de l’interprétation, de l'exhaustivité, de la complétude et de l'actualisation des données et informations contenues dans ce site, ni des conséquences de leur utilisation. L’internaute exploite les données et informations diffusées sur le site sous sa seule et entière responsabilité.
                        </p>
                        <p>
                            The EquiDex ne peut être tenue responsable de dommages directs ou indirects, matériels ou immatériels, que ces dommages soient imputables ou non à la consultation et à l’utilisation du présent site. The EquiDex ne peut être tenue responsable du contenu des sites vers lesquels elle renvoie, et/ou pointe.
                        </p>
                    </section>

                    {/* Section VIII */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            VIII. Loi
                        </h2>
                        <p>
                            Le site web est soumis à la loi française ainsi que les présentes mentions légales.
                        </p>
                    </section>

                    {/* Section IX */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            IX. Modifications
                        </h2>
                        <p>
                            The EquiDex se réserve le droit à tout moment de modifier tout ou partie des présentes mentions légales et s'efforcera d'en avertir au préalable les internautes. Toutes remarques peuvent être adressées à l'adresse suivante : <strong>contact@equidex.fr</strong>
                        </p>
                    </section>

                    {/* Section X */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            X. Comportement des Utilisateurs
                        </h2>
                        <p>
                            Vous reconnaissez et acceptez de ne pas télécharger, diffuser, poster, envoyer ou faire passer sous quelque forme que ce soit des contenus qui ne respectent pas les brevets, marques, secrets commerciaux, copyrights ou autres propriétés intellectuelles.
                        </p>
                    </section>

                    {/* Section XI */}
                    <section className="mb-10">
                        <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 uppercase tracking-wide border-l-4 border-amber-600 pl-4">
                            XI. Crédits
                        </h2>
                        <ul className="list-none pl-0 space-y-2">
                            <li><strong>Webdesign :</strong> Frédéric Ledoux</li>
                            <li><strong>Développement :</strong> Agence web sideapps</li>
                            <li><strong>Photos :</strong> Olivier Guyot - <a href="http://www.olivierguyot.fr" target="_blank" rel="noreferrer" className="text-amber-600 hover:underline">www.olivierguyot.fr</a></li>
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
};
