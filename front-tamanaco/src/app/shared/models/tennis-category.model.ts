import { Ranking } from "./ranking.model";

export interface TennisCategory {
  catKey: number;
  categoryName: string;
  description: string;
  type: string;
  ranking_rankingKey: number;
}
