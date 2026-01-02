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
            text: "Bonjour ! Je suis EquiBot 🐴. Je suis là pour répondre à toutes vos questions sur l'équitation, les soins ou notre plateforme. Comment puis-je vous aider ?",
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll automatique à chaque changement de messages ou ouverture
    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userText = inputText.trim();
        setInputText('');
        
        // 1. Sauvegarder l'historique pour l'API (avant l'ajout du nouveau message utilisateur, car l'API attend l'historique PASSÉ)
        const currentHistory = [...messages];

        // 2. Ajouter le message utilisateur à l'UI immédiatement
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            text: userText,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        // 3. Appel à l'API via le service intermédiaire
        try {
            const responseText = await sendMessageToEquiBot(currentHistory, userText);
            
            const modelMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, modelMsg]);
        } catch (error) {
            const errorMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Oups, une erreur est survenue. Réessayez plus tard.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
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
                <div className="bg-equidex-dark text-white p-4 sm:rounded-t-2xl flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-500 p-2 rounded-lg shadow-inner">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold tracking-wide">EquiBot IA</h3>
                            <p className="text-[10px] text-gray-300 flex items-center gap-1 uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                En ligne
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-grow overflow-y-auto p-4 bg-gray-50 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3.5 text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-amber-600 text-white rounded-2xl rounded-tr-none' 
                                    : 'bg-white text-slate-800 border border-gray-100 rounded-2xl rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1.5 items-center">
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></span>
                                <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white sm:rounded-b-2xl">
                    <div className="relative flex items-center gap-2">
                        <input 
                            type="text" 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Posez votre question..."
                            className="flex-grow pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm transition-all"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !inputText.trim()}
                            className="absolute right-2 p-2 bg-equidex-dark text-white rounded-full hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-equidex-dark transition-all shadow-sm"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-gray-400">Propulsé par Google Gemini</span>
                    </div>
                </form>
            </div>
        </>
    );
};