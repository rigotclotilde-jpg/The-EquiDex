
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { JobOffer } from '../types';
import { api } from '../services/api';

interface JobContextType {
    jobs: JobOffer[];
    isLoading: boolean;
    addJob: (job: Omit<JobOffer, 'id' | 'date' | 'isPremium' | 'image' | 'perks'>) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobs, setJobs] = useState<JobOffer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Chargement initial des offres depuis l'API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await api.jobs.getAll();
                setJobs(data);
            } catch (error) {
                console.error("Erreur lors du chargement des offres:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const addJob = async (newJobData: Omit<JobOffer, 'id' | 'date' | 'isPremium' | 'image' | 'perks'>) => {
        // On retourne la promesse pour permettre au composant d'afficher un état de chargement
        const createdJob = await api.jobs.create(newJobData);
        setJobs(prevJobs => [createdJob, ...prevJobs]);
    };

    return (
        <JobContext.Provider value={{ jobs, isLoading, addJob }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error("useJobContext must be used within a JobProvider");
    }
    return context;
};

// Export du type pour compatibilité avec l'existant si nécessaire, 
// mais préférez l'import depuis '../types'
export type { JobOffer };
