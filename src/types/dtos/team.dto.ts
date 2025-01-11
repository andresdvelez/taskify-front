export interface CreateTeamDto {
  name: string;
  description?: string;
  members: string[];
}

export interface UpdateTeamDto {
  name?: string;
  description?: string;
  members?: string[];
  isActive?: boolean;
}
