
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Mail, Phone, MapPin, Building, Headset, Handshake, Calendar, Clock } from 'lucide-react';

type TabId = 'form' | 'client' | 'presse' | 'siege';

export const Contact: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('form');
    
    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Gestion des changements dans les champs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { name, email, subject, message } = formData;
        const recipient = "rigot.clotilde@gmail.com";
        
        // Construction du corps du mail
        const emailBody = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        // Création du lien mailto avec encodage des caractères spéciaux
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent("[Contact EquiDex] " + subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Ouverture du client mail par défaut
        window.location.href = mailtoLink;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-white py-16 text-center border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-sm text-gray-500 mb-4 flex justify-center items-center gap-2">
                        <Link to="/" className="hover:text-amber-600">Accueil</Link> / <span className="text-amber-600 font-medium">Contact</span>
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-equidex-dark mb-4">Contactez The EquiDex</h1>
                    <h2 className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choisissez votre sujet pour afficher l'information correspondante.
                    </h2>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    
                    {/* Tab Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <TabButton 
                            id="form" 
                            label="Formulaire de contact" 
                            active={activeTab === 'form'} 
                            onClick={() => setActiveTab('form')} 
                        />
                        <TabButton 
                            id="client" 
                            label="Service Client" 
                            active={activeTab === 'client'} 
                            onClick={() => setActiveTab('client')} 
                        />
                        <TabButton 
                            id="presse" 
                            label="Presse & Partenariats" 
                            active={activeTab === 'presse'} 
                            onClick={() => setActiveTab('presse')} 
                        />
                        <TabButton 
                            id="siege" 
                            label="Siège Social" 
                            active={activeTab === 'siege'} 
                            onClick={() => setActiveTab('siege')} 
                        />
                    </div>

                    {/* Tab Content Wrapper */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100 animate-fade-in">
                        
                        {/* Formulaire */}
                        {activeTab === 'form' && (
                            <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block font-semibold text-slate-700">Nom Complet *</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        required 
                                        placeholder="Votre Nom et Prénom" 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white" 
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block font-semibold text-slate-700">Adresse E-mail *</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        required 
                                        placeholder="votre.email@exemple.com" 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white" 
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="block font-semibold text-slate-700">Sujet de la Demande *</label>
                                    <select 
                                        id="subject" 
                                        required 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Sélectionnez un sujet</option>
                                        <option value="Question générale">Question générale</option>
                                        <option value="Problème technique / Bug">Problème technique / Bug</option>
                                        <option value="Abonnement / Facturation">Abonnement / Facturation</option>
                                        <option value="Proposition article">Proposition article</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="block font-semibold text-slate-700">Votre Message *</label>
                                    <textarea 
                                        id="message" 
                                        rows={6} 
                                        required 
                                        placeholder="Détaillez votre demande ici..." 
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-y bg-slate-50 focus:bg-white"
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <p className="text-xs text-gray-500 italic">* Nous traitons vos données conformément à notre politique de confidentialité.</p>
                                <Button type="submit" className="w-full py-4 text-lg justify-center">Envoyer le Message</Button>
                            </form>
                        )}

                        {/* Service Client */}
                        {activeTab === 'client' && (
                            <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
                                <div>
                                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Headset size={32} className="text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Support Client Dédié</h3>
                                    <p className="text-gray-600">Notre équipe est là pour vous aider avec vos questions techniques, votre abonnement ou toute autre demande d'assistance.</p>
                                </div>
                                <hr className="border-gray-100" />
                                <div className="space-y-4">
                                    <p className="flex items-center justify-center gap-2 text-lg text-slate-700">
                                        <Mail className="text-amber-600" size={20} /> 
                                        E-mail : <a href="mailto:rigot.clotilde@gmail.com" className="text-amber-700 font-medium hover:underline">rigot.clotilde@gmail.com</a>
                                    </p>
                                    <p className="flex items-center justify-center gap-2 text-lg text-slate-700">
                                        <Phone className="text-amber-600" size={20} /> 
                                        Téléphone : <span className="font-bold text-slate-800">+33 (0)1 80 00 00 00</span>
                                    </p>
                                    <p className="text-sm text-gray-500">(Lun-Ven, 9h-17h)</p>
                                </div>
                            </div>
                        )}

                        {/* Presse */}
                        {activeTab === 'presse' && (
                            <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
                                <div>
                                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Handshake size={32} className="text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Collaborations & Médias</h3>
                                    <p className="text-gray-600">Contactez notre service communication pour les demandes de presse, les opportunités de partenariats ou les interviews.</p>
                                </div>
                                <hr className="border-gray-100" />
                                <div className="space-y-4">
                                    <p className="flex items-center justify-center gap-2 text-lg text-slate-700">
                                        <Mail className="text-amber-600" size={20} /> 
                                        E-mail : <a href="mailto:rigot.clotilde@gmail.com" className="text-amber-700 font-medium hover:underline">rigot.clotilde@gmail.com</a>
                                    </p>
                                    <div className="pt-4 flex justify-center">
                                        <Button variant="outline" className="gap-2 border-amber-600 text-amber-600 hover:bg-amber-50">
                                            <Calendar size={18} /> Demander un rendez-vous
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Siege */}
                        {activeTab === 'siege' && (
                            <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in">
                                <div>
                                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Building size={32} className="text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Adresse Postale & Administration</h3>
                                    <p className="text-gray-600">Utilisez cette adresse uniquement pour le courrier administratif ou officiel.</p>
                                </div>
                                <hr className="border-gray-100" />
                                <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 inline-block">
                                    <p className="flex items-center justify-center gap-2 text-lg font-bold text-slate-800 mb-2">
                                        <MapPin className="text-amber-600" size={24} /> 
                                        12 Rue du Galop, 75008 Paris, France
                                    </p>
                                </div>
                                <p className="flex items-center justify-center gap-2 text-gray-500">
                                    <Clock className="text-amber-600" size={18} /> 
                                    Visites sur rendez-vous uniquement.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

const TabButton: React.FC<{ id: string; label: string; active: boolean; onClick: () => void }> = ({ id, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 ${
            active 
                ? 'bg-equidex-dark text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
    >
        {label}
    </button>
);
