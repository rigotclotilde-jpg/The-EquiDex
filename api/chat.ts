import { GoogleGenAI } from '@google/genai';
import type { ChatMessage } from '../types';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { history = [], message } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('Missing GEMINI_API_KEY on server');
        return res.status(500).json({ error: 'Clé API Gemini manquante sur le serveur.' });
    }

    try {
        const ai = new GoogleGenAI({ apiKey });

        const historyForModel = (history as ChatMessage[])
            .filter(msg => msg.id !== 'welcome')
            .map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: historyForModel,
            config: {
                systemInstruction: "Tu es EquiBot, l'assistant virtuel expert de la plateforme 'The EquiDex'. Tu es un spécialiste mondialement reconnu du monde équestre (soins vétérinaires, technique de monte, équipement, compétitions, réglementation). Ton ton est professionnel, poli, encourageant et concis. Tu réponds toujours en français. Si une question ne concerne pas le monde du cheval, ramène poliment le sujet vers ta passion équestre. N'hésite pas à utiliser des émojis liés aux chevaux 🐴.",
            },
        });

        const response = await chat.sendMessage({ message });
        return res.status(200).json({ text: response.text });
    } catch (error) {
        console.error('AI Server Error:', error);
        return res.status(500).json({ error: 'Erreur du service AI' });
    }
}
