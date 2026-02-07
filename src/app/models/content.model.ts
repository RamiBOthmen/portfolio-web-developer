export interface PortfolioContent {
    personal: PersonalInfo;
    skills: SkillCategory[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
}

export interface PersonalInfo {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedIn: string;
    github: string;
    tagline: string;
    about: string;
    yearsExperience: number;
    projectsCount: number;
    certificationsCount: number;
    profileImage?: string;
    languages?: Language[];
    interests?: Interest[];
}

export interface Language {
    name: string;
    level: string;
    flag: string;
}

export interface Interest {
    name: string;
    icon: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface Project {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    technologies: string[];
    image: string;
    link: string;
    repo: string;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Education {
    school: string;
    degree: string;
    period: string;
    details?: string;
}

export interface Certification {
    name: string;
    issuer: string;
    date: string;
    verificationLink?: string;
    image?: string;
}
