import { BoxScoreClient } from '../resources/boxscore/boxscore-client';
import { PlayerStats } from '../models/boxscore/player-stats';
import { BoxScoreDataStore } from '../resources/boxscore/boxscore-data-store';
import { TeamStats } from '../models/boxscore/team-stats';
import { StartBenchStats } from '../models/boxscore/starter-bench-stats';

export class BoxScoreService {
  private store: BoxScoreDataStore;
  constructor(store: BoxScoreDataStore) {
    this.store = store;
  }

  public async writePlayerStatsByGameID(gameId: string) {
    return await this.store.writePlayerStats(gameId);
  }

  public async writeTeamStatsByGameID(gameId: string) {
    return await this.store.writeTeamStats(gameId);
  }

  public async writeStarterBenchStatsByGameID(gameId: string) {
    return await this.store.writeStarterBenchStats(gameId);
  }
}
