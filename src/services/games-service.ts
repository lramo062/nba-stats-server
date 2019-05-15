import axios from 'axios';
import { GameClient } from '../resources/games/games-client';
import { Game } from '../models/games/game';
import { GameDataStore } from '../resources/games/games-data-store';
import { write } from 'fs';
import { DateFormatter } from '../resources/shared/date-formatter';
import moment from 'moment';
import * as mongodb from 'mongodb';

export class GameService {
  private store: GameDataStore;
  constructor(store: GameDataStore) {
    this.store = store;
  }

  public async writeGamesByDate(date: string) {
    return await this.store.writeGamesByDate(date);
  }
}
