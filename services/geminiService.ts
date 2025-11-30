
import { api } from './api';
import { ChatMessage } from '../types';

/**
 * Envoie un message à EquiBot via notre API sécurisée.
 * @param history L'historique complet de la conversation (pour le contexte)
 * @param message Le nouveau message de l'utilisateur
 */
export const sendMessageToEquiBot = async (history: ChatMessage[], message: string): Promise<string> => {
    try {
        // On délègue l'appel à notre couche API (qui simule le serveur)
        const response = await api.chat.sendMessage(history, message);
        return response;
    } catch (error) {
        console.error("Chat Service Error:", error);
        return "Erreur de communication avec le serveur EquiDex.";
    }
};
