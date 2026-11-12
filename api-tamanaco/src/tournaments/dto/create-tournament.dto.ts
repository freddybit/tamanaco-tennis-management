
export interface CreateTournamentDto {
    tourName: string;
    tourDescription: string;
    startDate?: Date;
    categoryKey?: number;
}
