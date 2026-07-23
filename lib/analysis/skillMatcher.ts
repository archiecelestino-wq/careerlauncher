import {
  Skill,
  SKILL_DICTIONARY,
  getAllSkillTerms,
} from "./skillDictionary";

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsWholePhrase(
  text: string,
  phrase: string,
): boolean {
  const escaped = phrase.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  const regex = new RegExp(
    `(^|\\s)${escaped}(\\s|$)`,
    "i",
  );

  return regex.test(text);
}

export function findSkills(text: string): Skill[] {
  const normalized = normalizeText(text);

  const foundSkills = new Map<string, Skill>();

  for (const skill of SKILL_DICTIONARY) {
    const searchTerms = getAllSkillTerms(skill);

    const matched = searchTerms.some((term) =>
      containsWholePhrase(
        normalized,
        normalizeText(term),
      ),
    );

    if (matched) {
      foundSkills.set(skill.id, skill);
    }
  }

  return Array.from(foundSkills.values());
}

export function compareSkills(
  resumeSkills: Skill[],
  jobSkills: Skill[],
) {
  const resumeIds = new Set(
    resumeSkills.map((skill) => skill.id),
  );

  const jobIds = new Set(
    jobSkills.map((skill) => skill.id),
  );

  const matched = jobSkills.filter((skill) =>
    resumeIds.has(skill.id),
  );

  const missing = jobSkills.filter(
    (skill) => !resumeIds.has(skill.id),
  );

  const additional = resumeSkills.filter(
    (skill) => !jobIds.has(skill.id),
  );

  return {
    matched,
    missing,
    additional,
  };
}