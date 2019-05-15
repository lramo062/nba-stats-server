import axios from 'axios';
import { PlayerStats } from '../../models/boxscore/player-stats';
import { TeamStats } from '../../models/boxscore/team-stats';
import { StartBenchStats } from '../../models/boxscore/starter-bench-stats';

export class BoxScoreClient {
    private readonly URL = 'https://stats.nba.com/stats/boxscoretraditionalv2';
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
            EndPeriod: 0,
            EndRange: 28800,
            RangeType: 0,
            Season: '2018-19',
            SeasonType: 'Playoffs',
            StartPeriod: 1,
            StartRange: 0,
            // GameID is added at initialization
        },
    };

    constructor() { }

    public async fetchPlayerStatsByGameID(
        gameId: string
    ): Promise<PlayerStats[]> {
        this.options.params['GameID'] = gameId;
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get(this.URL, {
                    params: this.options.params,
                    headers: this.options.headers,
                });

                let headers = response.data.resultSets[0].headers;
                let playerStats = response.data.resultSets[0].rowSet;
                playerStats = this.statModeler(headers, playerStats).filter(
                    this.activePlayerFilter
                );

                resolve(playerStats);
            } catch (err) {
                reject(err);
            }
        });
    }

    private activePlayerFilter(stats: PlayerStats): boolean {
        return !stats.COMMENT;
    }

    public async fetchTeamStatsByGameID(gameId: string): Promise<TeamStats[]> {
        this.options.params['GameID'] = gameId;
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get(this.URL, {
                    params: this.options.params,
                    headers: this.options.headers,
                });
                let headers = response.data.resultSets[1].headers;
                let teamStats = response.data.resultSets[1].rowSet;
                teamStats = this.statModeler(headers, teamStats);
                resolve(teamStats);
            } catch (err) {
                reject(err);
            }
        });
    }

    public async fetchStarterBenchStatsByGameID(
        gameId: string
    ): Promise<StartBenchStats[]> {
        this.options.params['GameID'] = gameId;
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get(this.URL, {
                    params: this.options.params,
                    headers: this.options.headers,
                });
                let headers = response.data.resultSets[2].headers;
                let benchStarterStats = response.data.resultSets[2].rowSet;
                benchStarterStats = this.statModeler(headers, benchStarterStats);
                resolve(benchStarterStats);
            } catch (err) {
                reject(err);
            }
        });
    }

    private statModeler(headers: string[], statsArr: any[]): any[] {
        return statsArr.reduce((acc: any, curr: any) => {
            let stats: any = {};
            curr.forEach((value: any, index: number) => {
                stats[headers[index]] = value;
            });
            return acc.concat(stats);
        }, []);
    }
}