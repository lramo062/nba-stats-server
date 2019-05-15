import * as mongodb from 'mongodb';
import { Game } from '../../models/games/game';
import { DateFormatter } from '../shared/date-formatter';
import { GameClient } from './games-client';
import to from '../shared/to';
import { isRegExp } from 'util';


export class GameDataStore {
  private readonly URL: string = 'mongodb://mongo:27017/nba-stats';
  private readonly COLLECTION: string = 'games';
  private readonly DATABASE: string = 'nba-stats';
  private connection!: mongodb.MongoClient;
  private client!: GameClient;

  constructor(client: GameClient) {
    this.client = client;
  }

  private async connect() {
    try {
      const client = new mongodb.MongoClient(this.URL, { useNewUrlParser: true });
      return await client.connect();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async writeGamesByDate(date: string): Promise<Game[]> {
    if (!this.connection) {
      this.connection = await this.connect();
    }
    const games: Game[] = await this.client.fetchGamesByDate(date);
    if (games.length > 0) {
      const [err, res] = await to(this.connection
        .db(this.DATABASE)
        .collection(this.COLLECTION)
        .insertMany(games));
      if (err && err.toString().includes('duplicate')) {
        console.log('games have already been stored');
        process.exit(0);
      } else if (err) {
        throw new Error(err);
      }
      return games;
    } else {
      console.log('no games scheduled on ' + date);
      process.exit(0);
      return [];
    }
  }
}

