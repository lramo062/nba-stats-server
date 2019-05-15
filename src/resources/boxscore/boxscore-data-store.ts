import * as mongodb from 'mongodb';
import { Game } from '../../models/games/game';
import { DateFormatter } from '../shared/date-formatter';
import { PlayerStats } from '../../models/boxscore/player-stats';
import { TeamStats } from '../../models/boxscore/team-stats';
import { StartBenchStats } from '../../models/boxscore/starter-bench-stats';
import { BoxScoreClient } from './boxscore-client';
import to from '../shared/to';

export class BoxScoreDataStore {
  private readonly URL: string = 'mongodb://mongo:27017/nba-stats';
  private readonly DATABASE: string = 'nba-stats';
  private readonly PLAYER_COLLECTION: string = 'boxscore-player-stats';
  private readonly TEAM_COLLECTION: string = 'boxscore-team-stats';
  private readonly STARTER_BENCH_COLLECTION: string =
    'boxscore-starter-bench-stats';
  private connection!: mongodb.MongoClient;
  private client!: BoxScoreClient;

  constructor(client: BoxScoreClient) {
    this.client = new BoxScoreClient();
  }

  private async connect() {
    try {
      const conn = new mongodb.MongoClient(this.URL, { useNewUrlParser: true });
      return await conn.connect();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async writePlayerStats(gameId: string) {
    if (!this.connection) {
      this.connection = await this.connect();
    }

    let stats = await this.client.fetchPlayerStatsByGameID(gameId);
    const [err, resp] = await to(this.connection
      .db(this.DATABASE)
      .collection(this.PLAYER_COLLECTION)
      .insertMany(stats));
    if (err && err.toString().includes('duplicate')) {
      console.log('player stats have already been stored');
    } else if (err) {
      throw new Error(err);
    }
  }

  public async writeTeamStats(gameId: string) {
    if (!this.connection) {
      this.connection = await this.connect();
    }

    let stats = await this.client.fetchTeamStatsByGameID(gameId);
    const [err, resp] = await to(this.connection
      .db(this.DATABASE)
      .collection(this.TEAM_COLLECTION)
      .insertMany(stats));
    if (err && err.toString().includes('duplicate')) {
      console.log('team-stats have already been stored');
    } else if (err) {
      throw new Error(err);
    }
  }

  public async writeStarterBenchStats(gameId: string) {
    if (!this.connection) {
      this.connection = await this.connect();
    }

    let stats = await this.client.fetchStarterBenchStatsByGameID(gameId);
    const [err, resp] = await to(this.connection
      .db(this.DATABASE)
      .collection(this.STARTER_BENCH_COLLECTION)
      .insertMany(stats));
    if (err && err.toString().includes('duplicate')) {
      console.log('starter-bench-stats have already been stored');
    } else if (err) {
      throw new Error(err);
    }
  }
}
