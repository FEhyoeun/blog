export type ProjectCategory = "Project" | "Study" | "Presentation";
export type ProjectStatus = "In Progress" | "Completed" | "Planned" | "On Hold";

export type Project = {
  id: number;
  category: ProjectCategory;
  title: string;
  description: string;
  skills: string[];
  status: ProjectStatus;
  teamSize: number;
  role: string;
  highlights?: string[];
  githubURL?: string;
  liveURL?: string;
};
