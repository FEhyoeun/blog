export type ActivitiesCategory = "Project" | "Study" | "Presentation";
export type ActivitiesStatus =
  | "In Progress"
  | "Completed"
  | "Planned"
  | "On Hold";

export type Activities = {
  id: number;
  category: ActivitiesCategory;
  title: string;
  description: string;
  skills: string[];
  status: ActivitiesStatus;
  role: string;
  teamSize?: number;
  highlights?: string[];
  githubURL?: string;
  liveURL?: string;
  imageURLs?: string[];
  articleURL?: string;
};
