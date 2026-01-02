
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    FileEdit, 
    Star, 
    CheckCircle, 
    CalendarCheck, 
    AlertCircle, 
    MessageSquare, 
    Phone,
    Eye,
    TrendingUp,
    ArrowRight,
    Settings,
    Briefcase,
    Plus,
    Save,
    Loader2
} from 'lucide-react';
import { Button } from '../components/Button';
import { useJobContext } from '../context/JobContext';
import { useUserContext } from '../context/UserContext';
import { api } from '../services/api';

type TabId = 'kpis' | 'clients' | 'profil' | 'recrutement';

export const ProDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('kpis');
    const { addJob } = useJobContext();
    const { user } = useUserContext();

    const [stable, setStable] = useState<any | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [jobError, setJobError] = useState<string | null>(null);
    const [jobSuccess, setJobSuccess] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        const loadStable = async () => {
            if (!user || user.type !== 'pro') return setStable(null);
            try {
                const data = await api.stables.getByOwner(user.id);
                if (mounted) setStable(data);
            } catch (err) {
                console.warn('Erreur chargement écurie:', err);
                if (mounted) setStable(null);
            }
        };
        loadStable();
        return () => { mounted = false; };
    }, [user]);

    // Auto-dismiss success message after 5 seconds
    useEffect(() => {
        if (!jobSuccess) return;
        const t = window.setTimeout(() => setJobSuccess(null), 5000);
        return () => clearTimeout(t);
    }, [jobSuccess]);

    // État pour le formulaire d'ajout d'offre
    const [jobForm, setJobForm] = useState({
        title: '',
        company: '', // Will be prefilled with stable name when available
        location: '',
        type: 'CDI',
        salary: '',
        ref: '',
        description: '',
        missions: '', // Sera converti en array
        profile: '', // Sera converti en array
        benefits: '' // Sera converti en array
    });

    // When stable data is loaded, prefill company field
    useEffect(() => {
        if (stable && stable.name) {
            setJobForm((f) => ({ ...f, company: stable.name }));
        }
    }, [stable]);

    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setJobError(null);
        setJobSuccess(null);

        try {
            // Conversion des champs texte en tableaux (séparés par des retours à la ligne)
            const missionsArray = jobForm.missions.split('\n').filter(line => line.trim() !== '');
            const profileArray = jobForm.profile.split('\n').filter(line => line.trim() !== '');
            const benefitsArray = jobForm.benefits.split('\n').filter(line => line.trim() !== '');

            await addJob({
                title: jobForm.title,
                company: jobForm.company,
                location: jobForm.location,
                type: jobForm.type,
                salary: jobForm.salary,
                description: jobForm.description,
                ref: jobForm.ref || `REF-${Date.now()}`,
                missions: missionsArray.length > 0 ? missionsArray : ["Missions à définir"],
                profile: profileArray.length > 0 ? profileArray : ["Profil à définir"],
                benefits: benefitsArray.length > 0 ? benefitsArray : ["Avantages à définir"],
                start: "Dès que possible"
            });

            setJobSuccess("Votre offre d'emploi a été publiée avec succès !");
            // Reset form
            setJobForm({
                title: '',
                company: '',
                location: '',
                type: 'CDI',
                salary: '',
                ref: '',
                description: '',
                missions: '',
                profile: '',
                benefits: ''
            });
        } catch (error: any) {
            console.error(error);
            setJobError(error?.message || "Erreur lors de la publication.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const stats: { id: number; label: string; value: string; icon: JSX.Element; trend?: string; subtext?: string }[] = [
        { id: 1, label: "Nouveaux Prospects", value: "—", icon: <Users className="text-amber-600" size={24} /> },
        { id: 2, label: "Stages Confirmés", value: "—", icon: <CalendarCheck className="text-amber-600" size={24} /> },
        { id: 3, label: "Vues de la Fiche", value: "—", icon: <Eye className="text-amber-600" size={24} /> },
        { id: 4, label: "Note Moyenne", value: "—", icon: <Star className="text-yellow-400 fill-current" size={24} /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-equidex-dark flex items-center gap-3">
                            <LayoutDashboard className="text-amber-600" size={32} />
                            Tableau de Bord
                        </h1>
                        <p className="text-gray-500 mt-1">{stable?.name ? `${stable.name} • Compte Pro` : 'Compte Pro'}</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="!text-slate-600 !border-slate-300 hover:!bg-slate-100">
                            <Settings size={18} /> Paramètres
                        </Button>
                        <Link to="/edit-profile">
                            <Button variant="primary">
                                <FileEdit size={18} /> Modifier ma fiche
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200 flex overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('kpis')}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${activeTab === 'kpis' ? 'border-amber-600 text-amber-600 bg-amber-50/50' : 'border-transparent text-gray-500 hover:text-slate-800'}`}
                    >
                        <TrendingUp size={18} />
                        Synthèse & KPIs
                    </button>
                    <button 
                        onClick={() => setActiveTab('clients')}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${activeTab === 'clients' ? 'border-amber-600 text-amber-600 bg-amber-50/50' : 'border-transparent text-gray-500 hover:text-slate-800'}`}
                    >
                        <MessageSquare size={18} />
                        Clients & Messages
                    </button>
                    <button 
                        onClick={() => setActiveTab('profil')}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${activeTab === 'profil' ? 'border-amber-600 text-amber-600 bg-amber-50/50' : 'border-transparent text-gray-500 hover:text-slate-800'}`}
                    >
                        <FileEdit size={18} />
                        Aperçu Profil
                    </button>
                    <button 
                        onClick={() => setActiveTab('recrutement')}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${activeTab === 'recrutement' ? 'border-amber-600 text-amber-600 bg-amber-50/50' : 'border-transparent text-gray-500 hover:text-slate-800'}`}
                    >
                        <Briefcase size={18} />
                        Recrutement
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-b-xl shadow-sm p-6 md:p-8 min-h-[500px]">
                    
                    {/* TAB: KPIs */}
                    {activeTab === 'kpis' && (
                        <div className="animate-fade-in space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Performances (30 jours)</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {stats.map((stat) => (
                                        <div key={stat.id} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-2 bg-white rounded-lg shadow-sm">{stat.icon}</div>
                                                {stat.trend && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{stat.trend}</span>}
                                            </div>
                                            <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                                            <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">{stat.label}</div>
                                            {stat.subtext && <div className="text-xs text-gray-400 mt-1">{stat.subtext}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <CheckCircle size={20} className="text-slate-400" />
                                        Tâches Prioritaires
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className="mt-1 w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-amber-500 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-slate-800 font-medium group-hover:text-amber-700 transition-colors">Répondre à un avis récent</p>
                                                <p className="text-xs text-gray-500">Reçu hier • Note: 4/5</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className="mt-1 w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-amber-500 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-slate-800 font-medium group-hover:text-amber-700 transition-colors">Facturation Pension Mlle Lefèvre</p>
                                                <p className="text-xs text-gray-500">Échéance : 05/11</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                                            <AlertCircle className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                                            <div>
                                                <p className="text-amber-900 font-bold">Compléter votre profil</p>
                                                <p className="text-xs text-amber-700">Votre fiche est à 95%. Ajoutez une photo pour atteindre 100%.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-serif font-bold mb-2">Boostez votre visibilité</h3>
                                        <p className="text-slate-300 text-sm mb-6">Passez à l'offre Premium pour apparaître en tête des résultats de recherche dans votre région.</p>
                                        <Button variant="primary" className="w-full sm:w-auto">
                                            Découvrir l'offre Premium
                                        </Button>
                                    </div>
                                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: CLIENTS */}
                    {activeTab === 'clients' && (
                        <div className="animate-fade-in">
                            <h3 className="text-lg font-bold text-slate-800 mb-6">Derniers Messages</h3>
                            
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer bg-blue-50/30">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 font-bold text-lg flex-shrink-0">
                                        SD
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-900">Client récent</h4>
                                            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">Nouveau</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                            Bonjour, Je suis intéressée par une pension travail pour ma jument de 7 ans. Avez-vous des disponibilités pour le mois prochain ? Cordialement.
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><CalendarCheck size={12} /> 05 Nov 2025</span>
                                            <span className="flex items-center gap-1"><MessageSquare size={12} /> Pension Travail</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 font-bold text-lg flex-shrink-0">
                                        TV
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-900">Demandeur</h4>
                                            <span className="text-xs text-gray-400">Lu</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Demande de tarif pour une carte de 10 leçons. Est-il possible de faire un essai ce samedi ?
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><CalendarCheck size={12} /> 04 Nov 2025</span>
                                            <span className="flex items-center gap-1"><Phone size={12} /> Rappel demandé</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 text-center">
                                <Button variant="outline" className="text-sm">Voir tout l'historique</Button>
                            </div>
                        </div>
                    )}

                    {/* TAB: PROFIL */}
                    {activeTab === 'profil' && (
                        <div className="animate-fade-in">
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-amber-900">Édition du Profil</h3>
                                    <p className="text-amber-700 text-sm">Mettez à jour vos tarifs, photos et infrastructures pour attirer plus de cavaliers.</p>
                                </div>
                                <Link to="/edit-profile">
                                    <Button variant="primary" className="whitespace-nowrap">
                                        <FileEdit size={18} /> Accéder à l'éditeur complet
                                    </Button>
                                </Link>
                            </div>

                            <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide border-b border-gray-100 pb-2">Aperçu des données actuelles</h4>

                            {stable ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Nom Commercial</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-slate-800 font-medium">{stable.name || 'Non renseigné'}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Prix Box Standard</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-slate-800 font-medium">{stable.price_box ? `${stable.price_box} €` : 'Non renseigné'}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Disciplines</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-slate-800 font-medium">{stable.disciplines ? (Array.isArray(stable.disciplines) ? stable.disciplines.join(', ') : stable.disciplines) : 'Non renseigné'}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Localisation</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-slate-800 font-medium">{stable.location || 'Non renseigné'}</div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email Contact</label>
                                        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-slate-800 font-medium">{stable.contact_email || 'Non renseigné'}</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 bg-slate-50 rounded-lg text-sm text-gray-500">Aucune information d'écurie enregistrée pour l'instant. Complétez votre fiche pour l'afficher ici.</div>
                            )}
                        </div>
                    )}

                    {/* TAB: RECRUTEMENT */}
                    {activeTab === 'recrutement' && (
                        <div className="animate-fade-in max-w-4xl mx-auto">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Briefcase size={24} className="text-amber-600" /> Publier une offre d'emploi
                            </h3>
                            
                            <form onSubmit={handleJobSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                {jobError && (
                                    <div className="mb-4 p-4 rounded border border-red-100 bg-red-50 text-red-700">
                                        {jobError}
                                    </div>
                                )}
                                {jobSuccess && (
                                    <div className="mb-4 p-4 rounded border border-green-100 bg-green-50 text-green-700">
                                        {jobSuccess}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Intitulé du Poste *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={jobForm.title}
                                            onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                                            placeholder="Ex: Groom Concours, Cavalier..."
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="job-type" className="text-sm font-semibold text-slate-700">Type de Contrat *</label>
                                        <select 
                                            id="job-type"
                                            value={jobForm.type}
                                            onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        >
                                            <option value="CDI">CDI</option>
                                            <option value="CDD">CDD</option>
                                            <option value="Freelance">Freelance</option>
                                            <option value="Stage">Stage</option>
                                            <option value="Apprentissage">Apprentissage</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Localisation *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={jobForm.location}
                                            onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                                            placeholder="Ville, Département"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Salaire (Indicatif)</label>
                                        <input 
                                            type="text" 
                                            value={jobForm.salary}
                                            onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                                            placeholder="Ex: 2000€ net ou Selon profil"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Description du Poste *</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        value={jobForm.description}
                                        onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                                        placeholder="Décrivez le rôle et l'environnement de travail..."
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Missions (1 par ligne)</label>
                                        <textarea 
                                            rows={3}
                                            value={jobForm.missions}
                                            onChange={(e) => setJobForm({...jobForm, missions: e.target.value})}
                                            placeholder="- Soins quotidiens&#10;- Sortie paddock"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Profil Recherché (1 par ligne)</label>
                                        <textarea 
                                            rows={3}
                                            value={jobForm.profile}
                                            onChange={(e) => setJobForm({...jobForm, profile: e.target.value})}
                                            placeholder="- Permis B&#10;- Galop 7"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Avantages (1 par ligne)</label>
                                        <textarea 
                                            rows={3}
                                            value={jobForm.benefits}
                                            onChange={(e) => setJobForm({...jobForm, benefits: e.target.value})}
                                            placeholder="- Logement&#10;- Véhicule"
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <Button type="submit" variant="primary" className="gap-2" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        {isSubmitting ? 'Publication...' : "Publier l'offre"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
