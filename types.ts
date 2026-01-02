
export interface NavItem {
    label: string;
    path: string;
}

export interface Stable {
    id: number;
    name: string;
    location: string;
    specialty: string;
    rating: number;
    imageUrl: string;
    distance?: string;
    type?: string;
    facilities?: string[];
    price?: number;
    reviewsCount?: number;
    isPremium?: boolean;
    description?: string;
    // Contact & web
    contact_email?: string;
    contact_phone?: string;
    website?: string;
    // Images & ownership
    images?: string[];
    ownerId?: string;
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    category: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export interface LoyaltyDataPoint {
    month: string;
    points: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    type: 'cavalier' | 'pro';
    points: number;
    unlockedArticles: string[];
}

export interface JobOffer {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    date: string;
    description: string;
    missions: string[];
    profile: string[];
    benefits: string[];
    perks: string[];
    isPremium: boolean;
    image: string;
    ref?: string;
    start?: string;
}
