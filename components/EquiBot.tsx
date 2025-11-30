
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, Bot } from 'lucide-react';
import { sendMessageToEquiBot } from '../services/geminiService';
import { ChatMessage } from '../types';

export const EquiBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'model',
            text: "Bonjour ! Je suis EquiBot. Comment puis-je vous aider dans votre parcours équestre aujourd'hui ?",
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userText = inputText.trim();
        setInputText('');
        
        // 1. Sauvegarder l'historique actuel avant l'ajout du nouveau message utilisateur
        // (L'API attend l'historique *précédent* + le nouveau message en argument séparé, ou gère l'ajout)
        // Dans notre implémentation API, on passe l'historique existant.
        const currentHistory = [...messages];

        // 2. Ajouter le message utilisateur à l'UI
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: userText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        // 3. Appel à l'API sécurisée
        // On envoie l'historique complet (sans le dernier message utilisateur qu'on vient d'ajouter localement,
        // ou avec, selon la logique serveur. Ici api.ts prend l'historique et le message séparément).
        const responseText = await sendMessageToEquiBot(currentHistory, userText);

        // 4. Ajouter la réponse du modèle
        const modelMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, modelMsg]);
        setIsLoading(false);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-amber-600 to-amber-500 text-white p-4 rounded-full shadow-lg shadow-amber-500/30 hover:scale-105 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
                aria-label="Ouvrir EquiBot"
            >
                <Sparkles size={24} />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 h-[500px] bg-white sm:rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-equidex-dark text-white p-4 sm:rounded-t-2xl flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-amber-500 p-1.5 rounded-lg">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold">EquiBot</h3>
                            <p className="text-xs text-gray-300 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                En ligne (Sécurisé)
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-grow overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                msg.role === 'user' 
                                    ? 'bg-amber-600 text-white rounded-br-none' 
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white p-3 rounded-lg rounded-bl-none border border-gray-200 shadow-sm flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white sm:rounded-b-2xl">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Posez une question..."
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !inputText.trim()}
                            className="bg-equidex-dark text-white p-2 rounded-full hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
