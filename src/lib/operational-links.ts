/** Shared cross-link shape for playbooks, references, and operational surfaces. */
export type OperationalLink = {
  href: string;
  label: string;
  reason?: string;
};

export type OperationalLinkGroup = {
  glossary: OperationalLink[];
  guides: OperationalLink[];
  articles: OperationalLink[];
  references: OperationalLink[];
  playbooks: OperationalLink[];
  usedDuring?: string[];
  failureRelationships?: string[];
};
