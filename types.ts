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