export const roles = ["CHEF_EQUIPE", "EQUIPIER", "DIRECTEUR"] as const;

export type Role = (typeof roles)[number];

export type Poster = {
  id: string;
  name: string;
  quantity: number | null;
};

export type Employee = {
  id: string;
  name: string;
  role: Role;
};

export type PosterRequest = {
  id: string;
  posterTitle: string;
  employeeName: string;
  employeeRole: Role;
  note: string | null;
  isAccepted: boolean;
  createdAt: Date;
};
