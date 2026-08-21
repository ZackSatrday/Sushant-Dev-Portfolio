export type ThemeMode = 'swiss' | 'void';

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about-section',
  PROJECTS = 'projects',
  EXPERIENCE = 'experience',
  CONTACT = 'contact'
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  github: string;
  live: string;
}

export interface SocialLink {
  id: number;
  name: string;
  handle: string;
  url: string;
}

export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  stack: string[];
}
