export type IncidentType = {
  change_type: 'deletion' | 'creation' | 'update';
  id: number;
  modified_at: string;
  type: 'league' | 'match' | 'player' | 'serie' | 'team' | 'tournament';
  object: object;
};
