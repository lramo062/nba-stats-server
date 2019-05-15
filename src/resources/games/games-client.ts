import axios from 'axios';
import { Game } from '../../models/games/game';

export class GameClient {
  private baseUrl = 'https://stats.nba.com/stats/scoreboardV2';
  // request meta-data
  private options: any = {
    headers: {
      Accept: 'application/json*',
      Connection: 'keep-alive',
      'User-Agent': 'PostmanRuntime/7.4.0',
      'Cache-Control': 'max-age=0',
      Host: 'stats.nba.com',
      'accept-encoding': 'Accepflate, sdch',
      'accept-language': ' he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4'
    },
    params: {
      DayOffset: 0,
      LeagueID: '00',
      // gameDate is added at initialization
    },
    timeout: 5000,
  };

  constructor() { }

  public async fetchGamesByDate(date: string): Promise<Game[]> {
    this.options.params['gameDate'] = date;
    return new Promise(async (resolve, reject) => {
      try {
        let response = await axios.get(this.baseUrl, {
          params: this.options.params,
          headers: this.options.headers,
        });

        let headers = response.data.resultSets[0].headers;
        let games = response.data.resultSets[0].rowSet;
        games = this.gameModeler(headers, games);
        resolve(games);
      } catch (err) {
        reject(err);
      }
    });
  }

  private gameModeler(headers: string[], games: any[]): Game[] {
    return games.reduce((acc: any, curr: any) => {
      let stats: any = {};
      curr.forEach((value: any, index: number) => {
        if (index == 0 || index == 2 || index == 5) {
          stats[headers[index]] = value;
        }
      });
      return acc.concat(stats);
    }, []);
  }
}