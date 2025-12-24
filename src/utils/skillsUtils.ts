
export const DEFAULT_SKILLS = ['TypeScript', 'React', 'Redux'];


export const parseSkillsFromUrl = (skillsParam: string | null): string[] => {
    if (!skillsParam) return DEFAULT_SKILLS;
    try {
        const parsed = JSON.parse(skillsParam);

        if (Array.isArray(parsed) && parsed.length === 0) {
            return [];
        }
        
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SKILLS;
    } catch {
        return DEFAULT_SKILLS;
    }
};
