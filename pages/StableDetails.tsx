import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { 
    MapPin, Star, Info, Ruler, Trophy, Euro, Home, Box, 
    Warehouse, Trees, Lightbulb, Dumbbell, Droplets, Lock, 
    Shield, Recycle, Calendar, Sun, Medal, GraduationCap, 
    Briefcase, CreditCard, Wheat, Footprints, School, 
    Users, User, Mail, Phone, Globe, Facebook, Instagram, 
    Youtube, Heart, Share2, Eye, CheckCircle, Map, Plus, Save, Trash2, Loader2
} from 'lucide-react';
import { Button } from '../components/Button';
import { useUserContext } from '../context/UserContext';
import { api } from '../services/api';
import { Stable } from '../types';

// DnD
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export const StableDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState('presentation');
    const [stable, setStable] = useState<Stable | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user } = useUserContext();

    // Gallery pagination / edit
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(3);

    const [isEditing, setIsEditing] = useState(false);
    const [editImages, setEditImages] = useState<string[]>([]);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // lightbox
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const isOwner = !!(user && stable && (user.id === (stable as any).ownerId));

    // Responsive page size based on viewport
    useEffect(() => {
        const compute = () => {
            const w = window.innerWidth;
            if (w < 640) setPageSize(1); // mobile
            else if (w < 1024) setPageSize(2); // tablet
            else setPageSize(3); // desktop
        };
        compute();
        window.addEventListener('resize', compute);
        return () => window.removeEventListener('resize', compute);
    }, []);

    const prevPage = () => setPageIndex(p => Math.max(0, p - 1));
    const nextPage = () => {
        if (!stable || !stable.images) return;
        const totalPages = Math.ceil(stable.images.length / pageSize);
        setPageIndex(p => Math.min(totalPages - 1, p + 1));
    };

    const startEdit = () => {
        setEditImages(stable?.images ? [...stable.images] : (stable?.imageUrl ? [stable.imageUrl] : []));
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditImages([]);
        setNewImageUrl('');
    };

    const addNewImage = () => {
        const url = newImageUrl.trim();
        if (!url) return;
        setEditImages(e => [...e, url]);
        setNewImageUrl('');
    };

    const removeImage = (index: number) => {
        setEditImages(e => e.filter((_, i) => i !== index));
    };

    // Handle file upload input
    const handleFiles = async (files: FileList | null) => {
        if (!files || !stable) return;
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            try {
                const url = await api.stables.uploadImage(stable.id, f);
                setEditImages(e => [...e, url]);
            } catch (err) {
                console.error('Upload failed', err);
                alert('Échec de l\'upload de l\'image.');
            }
        }
    };

    // Drag & Drop reorder handler
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newArr = Array.from(editImages);
        const [removed] = newArr.splice(result.source.index, 1);
        newArr.splice(result.destination.index, 0, removed);
        setEditImages(newArr);
    };

    // lightbox helpers
    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextLightbox = () => {
        if (lightboxIndex === null || !stable?.images) return;
        setLightboxIndex((lightboxIndex + 1) % stable.images.length);
    };
    const prevLightbox = () => {
        if (lightboxIndex === null || !stable?.images) return;
        setLightboxIndex((lightboxIndex - 1 + stable.images.length) % stable.images.length);
    };
    const saveChanges = async () => {
        if (!stable) return;
        setIsSaving(true);
        try {
            const payload: any = { id: stable.id, images: editImages };
            await api.stables.upsert(payload);
            // reload
            const fresh: any = await api.stables.getById(stable.id as any);
            if (fresh) {
                // normalize same as initial load
                const normalized: Stable = {
                    id: fresh.id,
                    name: fresh.name || 'Nom de l\'écurie',
                    location: fresh.location || fresh.address || '',
                    specialty: fresh.specialty || fresh.type || '',
                    rating: fresh.rating || 0,
                    imageUrl: fresh.image_url || fresh.imageUrl || (fresh.images && fresh.images[0]) || `https://picsum.photos/1200/400?random=${fresh.id}`,
                    distance: fresh.distance || undefined,
                    type: fresh.type || undefined,
                    facilities: fresh.facilities || fresh.amenities || [],
                    price: fresh.price || fresh.price_box || undefined,
                    reviewsCount: fresh.reviews_count || 0,
                    isPremium: !!fresh.is_premium,
                    description: fresh.description || '',
                    images: fresh.images || fresh.image_urls || (fresh.image_url ? [fresh.image_url] : []),
                    ownerId: fresh.user_id
                };
                setStable(normalized);
            }
            setIsEditing(false);
        } catch (err) {
            console.error('Erreur sauvegarde galerie:', err);
            alert('Erreur lors de la sauvegarde des images.');
        } finally {
            setIsSaving(false);
        }
    }; 

    useEffect(() => {
        let mounted = true;
        const loadStable = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const data: any = await api.stables.getById(id);
                if (!mounted) return;
                if (!data) {
                    setStable(null);
                    setError('Fiche non trouvée.');
                } else {
                    // Normalize some fields to match Stable type
                    const normalized: Stable = {
                        id: data.id,
                        name: data.name || 'Nom de l\'écurie',
                        location: data.location || data.address || '',
                        specialty: data.specialty || data.type || '',
                        rating: data.rating || 0,
                        imageUrl: data.image_url || data.imageUrl || (data.images && data.images[0]) || `https://picsum.photos/1200/400?random=${data.id}`,
                        distance: data.distance || undefined,
                        type: data.type || undefined,
                        facilities: data.facilities || data.amenities || [],
                        price: data.price || data.price_box || undefined,
                        reviewsCount: data.reviews_count || 0,
                        isPremium: !!data.is_premium,
                        description: data.description || '',
                        images: data.images || data.image_urls || (data.image_url ? [data.image_url] : []),
                        ownerId: data.user_id
                    };
                    setStable(normalized);
                }
            } catch (err) {
                console.warn('Erreur chargement fiche:', err);
                setError('Erreur lors du chargement de la fiche.');
            } finally {
                if (mounted) setIsLoading(false);
            }
        };
        loadStable();
        return () => { mounted = false; };
    }, [id]);

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="relative h-96 md:h-[500px] bg-cover bg-center flex items-end text-white" style={{ backgroundImage: `url("${stable?.imageUrl || 'https://picsum.photos/1920/600?random=15'}")` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                <div className="relative z-10 container mx-auto px-4 pb-8 md:pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="w-full">
                            <div className="text-sm text-gray-300 mb-2 font-medium flex items-center gap-2">
                                <RouterLink to="/" className="hover:text-amber-500">Accueil</RouterLink> &gt; 
                                <RouterLink to="/directory" className="hover:text-amber-500">Annuaire</RouterLink> &gt; 
                                {isLoading ? <div className="h-4 w-48 bg-slate-200 animate-pulse rounded" /> : <span>{stable?.name || 'Établissement'}</span>}
                            </div>
                            {isLoading ? (
                                <div className="h-12 w-1/3 bg-slate-200 animate-pulse rounded mb-2"></div>
                            ) : (
                                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-shadow-lg">{stable?.name || 'Établissement'}</h1>
                            )}

                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-lg">
                                <div className="flex items-center gap-2 text-gray-200">
                                    <MapPin className="text-amber-500" size={20} />
                                    {isLoading ? <div className="h-4 w-40 bg-slate-200 animate-pulse rounded" /> : (stable?.location || 'Localisation non renseignée')}
                                </div>
                                <div className="flex items-center gap-2 text-gray-200">
                                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                                    <span className="font-bold">{stable ? (stable.rating || 0).toFixed(1) : '-'}/5.0</span>
                                    <span className="text-sm text-gray-400">({stable?.reviewsCount || 0} avis)</span>
                                </div>
                                {stable?.isPremium && (
                                    <div className="inline-block px-3 py-1 bg-amber-600/90 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wide border border-amber-500/50">
                                        Écurie PREMIUM 💎
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                             <Button variant="outline" className="flex-1 md:flex-none justify-center border-white text-white hover:bg-white/10">
                                <Share2 size={18} /> Partager
                             </Button>
                             <Button variant="outline" className="flex-1 md:flex-none justify-center border-white text-white hover:bg-white/10">
                                <Heart size={18} /> Favoris
                             </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Content */}
                    <div className="flex-grow w-full lg:w-3/4">
                        
                        {/* Tabs Navigation */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
                            <div className="flex overflow-x-auto scrollbar-hide">
                                {[
                                    { id: 'presentation', label: 'Présentation', icon: <Info size={18} /> },
                                    { id: 'infra', label: 'Infrastructures', icon: <Ruler size={18} /> },
                                    { id: 'activites', label: 'Activités', icon: <Trophy size={18} /> },
                                    { id: 'tarifs', label: 'Tarifs', icon: <Euro size={18} /> },
                                    { id: 'avis', label: 'Avis', icon: <Star size={18} /> },
                                    { id: 'job', label: 'Emplois', icon: <Briefcase size={18} /> },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors whitespace-nowrap border-b-2 hover:bg-slate-50 ${
                                            activeTab === tab.id
                                                ? 'border-amber-600 text-amber-600 bg-amber-50/50'
                                                : 'border-transparent text-gray-600 hover:text-slate-900'
                                        }`}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tabs Content */}
                        <div className="space-y-8">
                            
                            {activeTab === 'presentation' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        A. Présentation de l'Établissement
                                    </h3>
                                            <div className="prose text-gray-600 leading-relaxed max-w-none">
                                        {isLoading ? (
                                            <p className="mb-4">Chargement…</p>
                                        ) : error ? (
                                            <p className="mb-4 text-red-600">{error}</p>
                                        ) : stable ? (
                                            <>
                                                <p className="mb-4">{stable.description || "Description non renseignée."}</p>
                                                <p className="mb-6">{stable.specialty || 'Services et disciplines non renseignés.'}</p>
                                                <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700 bg-slate-50 p-4 rounded-lg">
                                                    {(stable.facilities && stable.facilities.length > 0) ? stable.facilities.slice(0,3).map((f, i) => (
                                                        <span key={i} className="flex items-center gap-2"><CheckCircle size={16} className="text-amber-600" /> {f}</span>
                                                    )) : (
                                                        <span className="text-sm text-gray-500">Aucune information d'infrastructure fournie.</span>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="mb-4 text-gray-500">Aucune information d'écurie enregistrée pour cette fiche.</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'infra' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        B. Infrastructures (Détail Exhaustif)
                                    </h3>

                                    {/* Photo Grid */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <h4 className="text-lg font-bold">Galerie Photos</h4>
                                        {!isEditing && isOwner && (
                                            <Button variant="outline" onClick={startEdit} className="text-sm">
                                                <Plus size={14} /> &nbsp; Modifier la galerie
                                            </Button>
                                        )}
                                        {isEditing && (
                                            <div className="flex items-center gap-2">
                                                <Button onClick={saveChanges} className="flex items-center" disabled={isSaving}>
                                                    {isSaving ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} Enregistrer
                                                </Button>
                                                <Button variant="outline" onClick={cancelEdit} className="text-sm"><Trash2 size={14} /> Annuler</Button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                        {isLoading ? (
                                            Array.from({length: pageSize}).map((_, i) => (
                                                <div key={i} className="w-full h-48 bg-slate-100 rounded-lg animate-pulse" />
                                            ))
                                        ) : (stable && stable.images && stable.images.length > 0) ? (
                                            (() => {
                                                const total = stable.images.length;
                                                const totalPages = Math.max(1, Math.ceil(total / pageSize));
                                                const start = pageIndex * pageSize;
                                                const pageImgs = stable.images.slice(start, start + pageSize);
                                                return (
                                                    <>
                                                        {!isEditing && (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                                                                {pageImgs.map((img, i) => (
                                                                    <div key={i} className="w-full h-48 overflow-hidden rounded-lg shadow-sm relative">
                                                                        <img onClick={() => openLightbox(start + i)} src={img} alt={`Photo ${start + i + 1}`} className="w-full h-full object-cover hover:scale-[1.02] transition-transform cursor-pointer" />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {isEditing && (
                                                            <DragDropContext onDragEnd={onDragEnd}>
                                                                <Droppable droppableId="images-droppable" direction="horizontal">
                                                                    {(provided: any) => (
                                                                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-3">
                                                                            {editImages.map((img, i) => (
                                                                                <Draggable key={img} draggableId={img} index={i}>
                                                                                    {(prov: any) => (
                                                                                        <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps} className="relative">
                                                                                            <img src={img} alt={`mini-${i}`} className="w-48 h-32 object-cover rounded shadow" />
                                                                                            <button onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-gray-200 text-sm">×</button>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            ))}
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            </DragDropContext>
                                                        )}
                                                    </>
                                                );
                                            })()
                                        ) : (
                                            <>
                                                <div className="w-full h-48 bg-slate-100 rounded-lg" />
                                                <div className="w-full h-48 bg-slate-100 rounded-lg" />
                                                <div className="w-full h-48 bg-slate-100 rounded-lg" />
                                            </>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            <Button variant="outline" onClick={prevPage} className="text-sm" disabled={pageIndex === 0}>Précédent</Button>
                                            <Button variant="outline" onClick={nextPage} className="text-sm" disabled={!stable || !stable.images || pageIndex >= Math.ceil((stable.images?.length || 0) / pageSize) - 1}>Suivant</Button>
                                        </div>
                                        <div className="text-sm text-gray-500">Page {stable && stable.images ? Math.min(pageIndex + 1, Math.ceil(stable.images.length / pageSize)) : 1} / {stable && stable.images ? Math.max(1, Math.ceil(stable.images.length / pageSize)) : 1}</div>
                                    </div>

                                    {/* Lightbox modal */}
                                    {lightboxIndex !== null && stable?.images && (
                                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                                            <div className="relative max-w-4xl w-full">
                                                <img src={stable.images[lightboxIndex]} className="w-full h-[70vh] object-contain" />
                                                <button onClick={closeLightbox} className="absolute top-4 right-4 bg-white rounded-full p-2">×</button>
                                                <button onClick={prevLightbox} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2">‹</button>
                                                <button onClick={nextLightbox} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2">›</button>
                                            </div>
                                        </div>
                                    )}

                                    {isEditing && (
                                        <div className="mt-4 space-y-3">
                                            <div className="flex gap-2 items-center">
                                                <input type="text" placeholder="URL de l'image" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded" />
                                                <Button onClick={addNewImage}><Plus size={14} /> Ajouter</Button>
                                                <label className="px-3 py-2 border border-gray-200 rounded cursor-pointer ml-2 bg-white">
                                                    <input type="file" accept="image/*" onChange={(e) => handleFiles(e.target.files)} className="hidden" multiple />
                                                    <span className="flex items-center gap-2"><Plus size={12} /> Upload</span>
                                                </label>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {editImages.map((img, idx) => (
                                                    <div key={idx} className="relative">
                                                        <img src={img} className="w-24 h-16 object-cover rounded" alt={`mini-${idx}`} />
                                                        <button onClick={() => removeImage(idx)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 border border-gray-200 text-sm">×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-8">
                                        {/* Logement */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Home size={20} /> Logement
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Type principal" value="Box avec Paddocks Individuel" isBadge />
                                                <DetailRow label="Autres types" value={['Pré avec Abri Naturel', 'Hébergement Mixte']} isBadges />
                                            </div>
                                        </div>

                                        {/* Aires de travail */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Ruler size={20} /> Aires de Travail & Sol
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Manèges Intérieurs" value="1 (Sol : Sable Fibré)" />
                                                <DetailRow label="Carrières Extérieures" value="2 (Sol : Sable de Fontainebleau)" />
                                                <DetailRow label="Éclairage" value="Carrière et Manège" />
                                            </div>
                                        </div>

                                        {/* Équipements */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Dumbbell size={20} /> Équipements & Soins
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Outils d'entraînement" value={['Marcheur (Simple)', 'Rond de Longe', 'Piste de Galop']} isBadges />
                                                <DetailRow label="Soins / Douche" value="Eau Chaude Disponible / Solarium : Oui" />
                                                <DetailRow label="Sellerie" value="Individuelle avec casier sécurisé" />
                                            </div>
                                        </div>

                                        {/* Sécurité */}
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Shield size={20} /> Sécurité & Environnement
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Surveillance" value={['Gardien sur place', 'Portail Codé', 'Vidéosurveillance']} isBadges />
                                                <DetailRow label="Démarche Durable" value={['Tri des Déchets', 'Gestion des Eaux (Citerne)']} isBadges />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activites' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        C. Activités & Services
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Calendar size={20} /> Stages & Enseignement
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Périodes" value={['Vacances Toussaint', 'Vacances Pâques', 'Week-ends']} isBadges />
                                                <DetailRow label="Thèmes" value={['Perfectionnement CSO', 'Passage de Galop']} isBadges />
                                                <DetailRow label="Diplômes" value={['DEJEPS', 'BPJEPS']} isBadges />
                                                <DetailRow label="Services Pro" value={['Pension Travail', 'Valorisation']} isBadges />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Trophy size={20} /> Compétitions
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Disciplines" value={['CSO', 'Dressage']} isBadges />
                                                <DetailRow label="Niveau" value={['Club', 'Amateur', 'Pro']} isBadges />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tarifs' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        E. Tarifs & Conditions
                                    </h3>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <CreditCard size={20} /> Pensions (Mensuel)
                                            </h4>
                                            <div className="grid gap-3">
                                                <PriceRow label="BOX CLASSIQUE" price="750 €" />
                                                <PriceRow label="Supplément Paddock Individuel" price="+50 €" />
                                                <PriceRow label="Pension Pré avec Abri" price="450 €" />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <Wheat size={20} /> Alimentation & Services
                                            </h4>
                                            <div className="grid gap-3">
                                                <DetailRow label="Litière Paille" value="Inclus" isBadge />
                                                <DetailRow label="Foin à volonté" value="Oui (3x/jour)" />
                                                <DetailRow label="Sortie Paddock" value="Inclus (5j/7)" />
                                                <PriceRow label="Forfait Travail (5 séances)" price="150 €" />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <School size={20} /> Enseignement
                                            </h4>
                                            <div className="grid gap-3">
                                                <PriceRow label="Cours Collectif" price="25 €" subLabel="/ séance" />
                                                <PriceRow label="Cours Particulier" price="45 €" subLabel="/ séance" />
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-amber-600 mb-4">
                                                <FileText size={20} /> Conditions
                                            </h4>
                                            <div className="grid gap-3">
                                                <PriceRow label="Adhésion Annuelle" price="120 €" />
                                                <DetailRow label="Préavis de départ" value="1 mois" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'avis' && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
                                    <h3 className="text-xl font-serif font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
                                        F. Avis Clients
                                    </h3>
                                    
                                    <div className="flex items-center gap-6 mb-8 bg-slate-50 p-6 rounded-xl">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-slate-800 mb-1">4.8</div>
                                            <div className="flex justify-center gap-1 text-yellow-400 mb-1">
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} />
                                                <Star fill="currentColor" size={16} className="text-yellow-400/50" />
                                            </div>
                                            <div className="text-xs text-gray-500">85 avis</div>
                                        </div>
                                        <div className="flex-grow border-l border-gray-200 pl-6">
                                            <p className="text-gray-600 italic text-lg leading-relaxed">
                                                "Ambiance familiale et installations impeccables. Le coaching dressage avec Monsieur Lenoir est exceptionnel. Mon cheval n'a jamais été aussi bien."
                                            </p>
                                            <div className="mt-4 font-bold text-slate-800">— Sophie D. <span className="text-xs font-normal text-gray-500 ml-2">Propriétaire depuis 3 ans</span></div>
                                        </div>
                                    </div>
                                    
                                    <div className="text-center">
                                        <Button variant="outline">Lire tous les avis</Button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/4 space-y-6">
                        
                        {/* Contact Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <User size={18} className="text-amber-600" /> Contacts
                            </h3>
                            
                            <div className="space-y-4 text-sm">
                                {isLoading ? (
                                    <div className="space-y-3">
                                        <div className="h-4 w-40 bg-slate-100 animate-pulse rounded" />
                                        <div className="h-4 w-48 bg-slate-100 animate-pulse rounded" />
                                        <div className="h-4 w-32 bg-slate-100 animate-pulse rounded" />
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex gap-3">
                                            <Users size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="block text-xs font-bold text-gray-400 uppercase">Nom Commercial</span>
                                                <span className="font-medium text-slate-800">{stable?.name || 'Non renseigné'}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Mail size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="block text-xs font-bold text-gray-400 uppercase">Email</span>
                                                <a href={`mailto:${stable?.contact_email || ''}`} className="font-medium text-amber-700 hover:underline">{stable?.contact_email || 'Non renseigné'}</a>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Phone size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="block text-xs font-bold text-gray-400 uppercase">Téléphone</span>
                                                <span className="font-medium text-slate-800">{stable?.contact_phone || 'Non renseigné'}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Globe size={16} className="text-amber-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <span className="block text-xs font-bold text-gray-400 uppercase">Site Web</span>
                                                <a href={stable?.website || '#'} className="font-medium text-amber-700 hover:underline">{stable?.website || 'Non renseigné'}</a>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <Button className="w-full mt-6 justify-center">Contacter</Button>
                        </div>

                        {/* Social & Manager */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <Share2 size={18} className="text-amber-600" /> Réseaux
                            </h3>
                            
                            <div className="mb-6">
                                <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Dirigeant</span>
                                <span className="font-medium text-slate-800 flex items-center gap-2">
                                    <User size={16} /> M. Jean-Claude Dupond
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <SocialBtn icon={<Facebook size={18} />} />
                                <SocialBtn icon={<Instagram size={18} />} />
                                <SocialBtn icon={<Youtube size={18} />} />
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                <Map size={18} className="text-amber-600" /> Localisation
                            </h3>
                            <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-gray-100">
                                <MapPin size={32} className="mb-2" />
                            </div>
                        </div>
                        
                        {/* Loyalty */}
                        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center gap-2">
                                <Star size={18} className="fill-amber-600 text-amber-600" /> Fidélité
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Cette écurie est partenaire <strong className="text-amber-700">ÉquiDex</strong>. Chaque euro dépensé vous rapporte des Pts. Ferrure !
                            </p>
                            <RouterLink to="/loyalty" className="text-xs font-bold text-amber-600 uppercase hover:underline tracking-wide">
                                En savoir plus &rarr;
                            </RouterLink>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const DetailRow: React.FC<{ label: string; value: string | string[]; isBadge?: boolean; isBadges?: boolean }> = ({ label, value, isBadge, isBadges }) => (
    <div className="flex items-start text-sm">
        <span className="font-bold text-gray-500 min-w-[150px]">{label} :</span>
        <div className="flex-1 font-medium text-slate-800">
            {isBadge ? (
                <span className="inline-block px-2 py-0.5 bg-amber-600 text-white rounded text-xs font-bold">{value}</span>
            ) : isBadges && Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2">
                    {value.map((v, i) => (
                        <span key={i} className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${i === 0 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {v}
                        </span>
                    ))}
                </div>
            ) : (
                value
            )}
        </div>
    </div>
);

const PriceRow: React.FC<{ label: string; price: string; subLabel?: string }> = ({ label, price, subLabel }) => (
    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
        <span className="font-medium text-slate-600">{label}</span>
        <div className="text-right">
            <span className="font-bold text-lg text-amber-700">{price}</span>
            {subLabel && <span className="text-xs text-gray-400 ml-1">{subLabel}</span>}
        </div>
    </div>
);

const SocialBtn: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
    <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all">
        {icon}
    </button>
);

// Re-declare FileText icon just for this component if needed, though CheckCircle is used above.
import { FileText } from 'lucide-react';
