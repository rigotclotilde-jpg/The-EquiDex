
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

type RegType = 'cavalier' | 'pro';

// Remarque: L'utilisation de 'useNavigate' nécessite que ce composant soit
// rendu dans le contexte d'un 'BrowserRouter' (ou 'HashRouter', etc.).

export const Auth: React.FC = () => {
    const [regType, setRegType] = useState<RegType>('cavalier');
    // Le hook 'useNavigate' de 'react-router-dom' doit être importé et utilisé
    // si l'application gère le routage.
    const navigate = useNavigate();

    // Logique de connexion et d'inscription
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique de connexion simulée
        console.log('Tentative de connexion...');
        navigate('/rider-dashboard');
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Logique d'inscription simulée
        console.log('Tentative d\'inscription...');
        if (regType === 'cavalier') {
            navigate('/rider-dashboard');
        } else {
            navigate('/pro-dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-white py-12 font-serif text-slate-900">
            {/* Page Header */}
            <div className="max-w-4xl mx-auto text-center px-4 mb-12">
                <h1 className="text-3xl md:text-4xl uppercase tracking-widest font-light mb-2">Bienvenue sur The EquiDex.</h1>
                <h2 className="text-lg md:text-xl text-gray-500 font-normal">Accédez à votre espace ou rejoignez l'Éperon d'Or.</h2>
            </div>

            <div className="max-w-5xl mx-auto px-4 flex flex-col lg:flex-row gap-12">
                
                {/* Login Column */}
                <div className="flex-1 bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg">
                    <h2 className="text-xl font-semibold mb-8 text-center">Connectez-vous à votre compte.</h2>
                    
                    <form onSubmit={handleLogin} className="space-y-6 font-sans">
                        <div className="space-y-2">
                            <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700">Adresse E-mail *</label>
                            <input 
                                type="email" 
                                id="login-email" 
                                required 
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700">Mot de Passe *</label>
                            <input 
                                type="password" 
                                id="login-password" 
                                required 
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors"
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded-sm border-gray-300 text-amber-600 focus:ring-amber-600" />
                                <span>Se souvenir de moi</span>
                            </label>
                            <a href="#" className="underline hover:text-amber-600 transition-colors font-medium">Mot de passe oublié ?</a>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-black text-white py-3 uppercase tracking-widest text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg shadow-md"
                        >
                            Se Connecter
                        </button>
                    </form>
                    
                    {/* Les boutons de connexion sociale ont été supprimés, ainsi que la ligne "OU" */}

                </div>

                {/* Registration Column */}
                <div className="flex-1 bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg">
                    <h2 className="text-xl font-semibold mb-6 text-center">Rejoignez l'Éperon d'Or.</h2>
                    
                    <div className="bg-amber-50 border border-amber-100 p-4 mb-8 flex gap-3 items-start text-sm text-amber-800 font-sans rounded-lg">
                        <Star size={16} className="mt-0.5 flex-shrink-0 fill-amber-600 text-amber-600" />
                        <p>L'inscription est gratuite et vous permet de commencer à cumuler vos <strong>Pts. Ferrure</strong> dès aujourd'hui !</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b-2 border-gray-100 mb-6">
                        <button 
                            className={`flex-1 pb-3 text-sm uppercase tracking-wider font-medium transition-colors ${regType === 'cavalier' ? 'border-b-2 border-amber-600 text-amber-600 -mb-0.5' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setRegType('cavalier')}
                        >
                            Cavalier
                        </button>
                        <button 
                            className={`flex-1 pb-3 text-sm uppercase tracking-wider font-medium transition-colors ${regType === 'pro' ? 'border-b-2 border-amber-600 text-amber-600 -mb-0.5' : 'text-gray-400 hover:text-gray-600'}`}
                            onClick={() => setRegType('pro')}
                        >
                            Professionnel
                        </button>
                    </div>

                    {/* Cavalier Form */}
                    {regType === 'cavalier' && (
                        <form onSubmit={handleRegister} className="space-y-5 font-sans animate-fade-in">
                            <div className="space-y-2">
                                <label htmlFor="cav-name" className="block text-sm font-semibold text-gray-700">Prénom et Nom *</label>
                                <input type="text" id="cav-name" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="cav-email" className="block text-sm font-semibold text-gray-700">Adresse E-mail *</label>
                                <input type="email" id="cav-email" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="cav-pass" className="block text-sm font-semibold text-gray-700">Mot de Passe *</label>
                                <input type="password" id="cav-pass" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                                <p className="text-xs text-gray-500">8 caractères min. dont une majuscule et un chiffre.</p>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <input type="checkbox" required className="mt-1 rounded-sm border-gray-300 text-amber-600 focus:ring-amber-600" />
                                <span>J'accepte les <a href="#" className="underline font-medium hover:text-amber-600">CGU</a> et la <a href="#" className="underline font-medium hover:text-amber-600">Politique de Confidentialité</a> *</span>
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-3 uppercase tracking-widest text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg shadow-md">
                                Créer Mon Compte Cavalier
                            </button>
                        </form>
                    )}

                    {/* Pro Form */}
                    {regType === 'pro' && (
                        <form onSubmit={handleRegister} className="space-y-5 font-sans animate-fade-in">
                            <div className="space-y-2">
                                <label htmlFor="pro-company" className="block text-sm font-semibold text-gray-700">Nom de l'Écurie / Structure *</label>
                                <input type="text" id="pro-company" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pro-contact" className="block text-sm font-semibold text-gray-700">Nom et Prénom du Gérant *</label>
                                <input type="text" id="pro-contact" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pro-email" className="block text-sm font-semibold text-gray-700">Adresse E-mail Professionnelle *</label>
                                <input type="email" id="pro-email" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="pro-pass" className="block text-sm font-semibold text-gray-700">Mot de Passe *</label>
                                <input type="password" id="pro-pass" required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-amber-600 focus:ring-1 focus:ring-amber-600 outline-none transition-colors" />
                                <p className="text-xs text-gray-500">8 caractères min. dont une majuscule et un chiffre.</p>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <input type="checkbox" required className="mt-1 rounded-sm border-gray-300 text-amber-600 focus:ring-amber-600" />
                                <span>J'accepte les <a href="#" className="underline font-medium hover:text-amber-600">CGU Pro</a> et la <a href="#" className="underline font-medium hover:text-amber-600">Politique de Confidentialité</a> *</span>
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-3 uppercase tracking-widest text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg shadow-md">
                                Créer Mon Compte Professionnel
                            </button>
                        </form>
                    )}
                </div>
            </div>
            {/* Ajout d'une petite animation pour les formes */}
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
export default Auth;
