export interface StackGroup { label: string; items: string[]; }

export const coreStack: StackGroup[] = [
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", items: ["Python", "Flask", "Supabase"] },
  { label: "AI/ML", items: ["scikit-learn", "Vertex AI", "Gemini API", "NumPy"] },
  { label: "Tools", items: ["Git", "GitHub", "Vite"] },
];
