
import React, { useState, useEffect, useRef } from 'react';
import { User, Home, Trophy, Euro, Image as ImageIcon, Save, Upload, X, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { useUserContext } from '../context/UserContext';
import { api } from '../services/api';

type StepId = 'info' | 'infra' | 'activites' | 'tarifs' | 'media';

export const EditProfile: React.FC = () => {
    const [activeStep, setActiveStep] = useState<StepId>('info');
    const formRef = useRef<HTMLFormElement | null>(null);
    const { user } = useUserContext();
    const [initialValues, setInitialValues] = useState<any>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

    // Auto-dismiss success message after 5 seconds
    useEffect(() => {
        if (!formSuccess) return;
        const t = window.setTimeout(() => setFormSuccess(null), 5000);
        return () => clearTimeout(t);
    }, [formSuccess]);

    useEffect(() => {
        (async () => {
            try {
                if (!user) return;
                const myStable = await api.stables.getByOwner(user.id);
                if (myStable) setInitialValues(myStable);
            } catch (err) {
                // ignore
            }
        })();
    }, [user]);

    const steps = [
        { id: 'info', label: 'Infos Générales', icon: <User size={18} /> },
        { id: 'infra', label: 'Infrastructures', icon: <Home size={18} /> },
        { id: 'activites', label: 'Activités', icon: <Trophy size={18} /> },
        { id: 'tarifs', label: 'Tarifs', icon: <Euro size={18} /> },
        { id: 'media', label: 'Médias', icon: <ImageIcon size={18} /> },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === activeStep);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setActiveStep(steps[currentStepIndex + 1].id as StepId);
            window.scrollTo(0, 0);
        }
    };

    const handlePrev = () => {
        if (currentStepIndex > 0) {
            setActiveStep(steps[currentStepIndex - 1].id as StepId);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setFormSuccess(null);
        if (!formRef.current) return;
        const form = formRef.current;
        const fd = new FormData(form as HTMLFormElement);

        const payload: any = {
            name: fd.get('nom_commercial') || '',
            denomination: fd.get('denomination_sociale') || '',
            manager: fd.get('dirigeant') || '',
            address: fd.get('adresse') || '',
            phone: fd.get('telephone') || '',
            email: fd.get('email') || '',
            website: fd.get('website') || '',
            price_box: fd.get('prix_box') || null,
            price_pre: fd.get('prix_pre') || null,
            description: fd.get('description') || ''
        };

        try {
            await api.stables.upsert(payload);
            setFormSuccess('Profil enregistré avec succès !');
        } catch (err: any) {
            console.error(err);
            const message = err?.message || 'Erreur lors de l’enregistrement.';
            setFormError(message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                
                {/* Header */}
                <div className="bg-white rounded-t-2xl p-8 shadow-sm border-b border-gray-100">
                    <h1 className="text-3xl font-serif font-bold text-equidex-dark flex items-center gap-3">
                        <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                            <User size={24} />
                        </span>
                        Édition du Profil Écurie
                    </h1>
                    <p className="mt-2 text-gray-500 ml-14">
                        Mettez à jour les informations visibles sur votre fiche publique.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white shadow-sm mb-8 rounded-b-2xl overflow-hidden">
                    <div className="flex flex-wrap md:flex-nowrap border-b border-gray-100">
                        {steps.map((step) => (
                            <button
                                key={step.id}
                                type="button"
                                onClick={() => setActiveStep(step.id as StepId)}
                                className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-semibold transition-all border-b-2 ${
                                    activeStep === step.id
                                        ? 'border-amber-600 text-amber-600 bg-amber-50/50'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {step.icon}
                                <span className="whitespace-nowrap">{step.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <form ref={(el) => formRef.current = el} className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in" onSubmit={handleSubmit}>
                    {formError && (
                        <div className="mb-4 p-4 rounded border border-red-100 bg-red-50 text-red-700">
                            {formError}
                        </div>
                    )}
                    {formSuccess && (
                        <div className="mb-4 p-4 rounded border border-green-100 bg-green-50 text-green-700">
                            {formSuccess}
                        </div>
                    )} 
                    
                    {/* STEP 1: INFOS */}
                    {activeStep === 'info' && (
                        <div className="space-y-8 animate-fade-in">
                            <SectionHeader title="Dénomination & Contacts" subtitle="Responsabilité Légale" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input label="Nom commercial *" id="nom_commercial" name="nom_commercial" required defaultValue={initialValues?.name || ''} />
                                <Input label="Dénomination Sociale" id="denomination_sociale" name="denomination_sociale" defaultValue={initialValues?.denomination || ''} />
                                <Input label="Nom du Dirigeant *" id="dirigeant" name="dirigeant" required defaultValue={initialValues?.manager || ''} />
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-equidex-dark mb-4">Coordonnées</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Input label="Adresse Complète *" id="adresse" name="adresse" required defaultValue={initialValues?.address || ''} />
                                    <Input label="Téléphone *" id="telephone" name="telephone" type="tel" required defaultValue={initialValues?.phone || ''} />
                                    <Input label="Email *" id="email" name="email" type="email" required defaultValue={initialValues?.email || ''} />
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-equidex-dark mb-4">Sur le Web</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Input label="Site Web" id="website" name="website" type="url" defaultValue={initialValues?.website || ''} />
                                    <Input label="Facebook URL" id="facebook" name="facebook" type="url" defaultValue={initialValues?.facebook || ''} />
                                    <Input label="Instagram URL" id="instagram" name="instagram" type="url" defaultValue={initialValues?.instagram || ''} />
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description publique</label>
                                    <textarea name="description" aria-label="Description publique" defaultValue={initialValues?.description || ''} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none" rows={4} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: INFRASTRUCTURES */}
                    {activeStep === 'infra' && (
                        <div className="space-y-8 animate-fade-in">
                            <SectionHeader title="Infrastructures & Logistique" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-equidex-dark mb-4">Logement</h4>
                                    <div className="space-y-4">
                                        <Select label="Type de logement principal" id="type_logement">
                                            <option>Box Simple</option>
                                            <option>Box Paddock</option>
                                            <option>Pré avec Abri</option>
                                            <option>Ecurie Active</option>
                                        </Select>
                                        <Select label="Sellerie" id="sellerie">
                                            <option>Individuelle</option>
                                            <option>Collective (casiers)</option>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-equidex-dark mb-4">Aires de travail</h4>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Select label="Carrières" id="nb_carrieres">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </Select>
                                            <Select label="Manèges" id="nb_maneges">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </Select>
                                        </div>
                                        <Select label="Type de Sol" id="sol">
                                            <option>Sable Fontainebleau</option>
                                            <option>Toubin Clément</option>
                                            <option>Bord Sol</option>
                                            <option>Sable standard</option>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-equidex-dark mb-4">Équipements & Sécurité</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <CheckboxGroup title="Outils">
                                        <Checkbox label="Rond de Longe" />
                                        <Checkbox label="Marcheur" />
                                        <Checkbox label="Solarium" />
                                    </CheckboxGroup>
                                    <CheckboxGroup title="Soins">
                                        <Checkbox label="Douche eau chaude" />
                                        <Checkbox label="Salle de pansage" />
                                    </CheckboxGroup>
                                    <CheckboxGroup title="Sécurité">
                                        <Checkbox label="Vidéosurveillance" />
                                        <Checkbox label="Gardien sur place" />
                                        <Checkbox label="Portail Digicode" />
                                    </CheckboxGroup>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: ACTIVITÉS */}
                    {activeStep === 'activites' && (
                        <div className="space-y-8 animate-fade-in">
                            <SectionHeader title="Activités & Enseignement" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <CheckboxGroup title="Disciplines">
                                    <Checkbox label="CSO" />
                                    <Checkbox label="Dressage" />
                                    <Checkbox label="CCE" />
                                    <Checkbox label="Loisir / Balade" />
                                    <Checkbox label="Poney Club" />
                                </CheckboxGroup>
                                <CheckboxGroup title="Services Pro">
                                    <Checkbox label="Valorisation" />
                                    <Checkbox label="Commerce" />
                                    <Checkbox label="Débourrage" />
                                    <Checkbox label="Coaching Concours" />
                                </CheckboxGroup>
                                <CheckboxGroup title="Compétitions">
                                    <Checkbox label="Club" />
                                    <Checkbox label="Amateur" />
                                    <Checkbox label="Pro" />
                                    <Checkbox label="Internationale" />
                                </CheckboxGroup>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: TARIFS */}
                    {activeStep === 'tarifs' && (
                        <div className="space-y-8 animate-fade-in">
                            <SectionHeader title="Tarifs & Conditions" />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input label="Pension Box (Mensuel) €" type="number" id="prix_box" name="prix_box" defaultValue={initialValues?.price_box || 750} />
                                <Input label="Pension Pré (Mensuel) €" type="number" id="prix_pre" name="prix_pre" defaultValue={initialValues?.price_pre || 450} />
                                <Input label="Supplément Paddock €" type="number" id="supp_paddock" name="supp_paddock" defaultValue={initialValues?.supp_paddock || 50} />
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-equidex-dark mb-4">Enseignement</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <Input label="Cours Collectif €" type="number" defaultValue="25" />
                                    <Input label="Cours Particulier €" type="number" defaultValue="45" />
                                    <Input label="Adhésion Annuelle €" type="number" defaultValue="120" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 5: MEDIA */}
                    {activeStep === 'media' && (
                        <div className="space-y-8 animate-fade-in">
                            <SectionHeader title="Photos & Vidéos" />

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-amber-500 hover:bg-amber-50/30 transition-all cursor-pointer group">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:shadow-md">
                                    <Upload className="text-gray-400 group-hover:text-amber-600" size={32} />
                                </div>
                                <p className="text-lg font-medium text-gray-700">Cliquez ou glissez vos photos ici</p>
                                <p className="text-sm text-gray-500 mt-1">Format JPG, PNG. Max 5Mo.</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {initialValues?.images && initialValues.images.length > 0 ? (
                                    initialValues.images.map((img: string, idx: number) => (
                                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden shadow-sm group">
                                            <img src={img} alt={`Aperçu ${idx+1}`} className="w-full h-full object-cover" />
                                            <button type="button" aria-label="Supprimer la photo" className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center text-gray-400">
                                        <span>Aucune image</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6">
                                <Input label="Lien Vidéo (YouTube/TikTok)" type="url" placeholder="https://..." />
                            </div>
                        </div>
                    )}

                    {/* Navigation Actions (Bottom) */}
                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                         {currentStepIndex > 0 ? (
                             <Button variant="ghost" onClick={handlePrev} type="button" className="gap-2">
                                <ArrowLeft size={18} /> Précédent
                             </Button>
                         ) : (
                             <div></div> /* Spacer */
                         )}

                         {currentStepIndex < steps.length - 1 ? (
                             <Button variant="primary" onClick={handleNext} type="button" className="px-8 gap-2">
                                Suivant <ArrowRight size={18} />
                             </Button>
                         ) : (
                             <Button variant="primary" type="submit" className="px-8 gap-2 bg-amber-600 border-amber-600 hover:bg-amber-700">
                                <Save size={18} /> Enregistrer le Profil
                             </Button>
                         )}
                    </div>

                </form>
            </div>
        </div>
    );
};

// --- Sub-components for layout ---

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-6 pb-4 border-b border-amber-100">
        <h3 className="text-xl font-serif font-bold text-equidex-dark">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</label>
        <input
            id={id}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
            {...props}
        />
    </div>
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }> = ({ label, id, children, ...props }) => (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">{label}</label>
        <select
            id={id}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
            {...props}
        >
            {children}
        </select>
    </div>
);

const CheckboxGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h5 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
            {title}
        </h5>
        <div className="space-y-2">
            {children}
        </div>
    </div>
);

const Checkbox: React.FC<{ label: string }> = ({ label }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-amber-600 checked:border-amber-600 transition-colors" />
            <CheckCircle size={12} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
        </div>
        <span className="text-gray-600 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
);
