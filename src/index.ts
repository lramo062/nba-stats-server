import { GameService } from "./services/games-service";
import { BoxScoreService } from "./services/boxscore-service";
import { Game } from "./models/games/game";
import { BoxScoreDataStore } from "./resources/boxscore/boxscore-data-store";
import { BoxScoreClient } from "./resources/boxscore/boxscore-client";
import { GameDataStore } from "./resources/games/games-data-store";
import { GameClient } from "./resources/games/games-client";

class Entry {

    private gameService: GameService;
    private boxScoreService: BoxScoreService;
    private args: string[] = process.argv.slice(2); /* STAT_TYPE SEARCH_PARAM_TYPE PARAM  */

    // TODO: add more job params 
    private readonly GAME_STAT = 'game';
    private readonly DATE_SEARCH = 'date';

    constructor(gameService: GameService, BoxScoreService: BoxScoreService) {
        this.gameService = gameService;
        this.boxScoreService = BoxScoreService;
    }

    public async fetchStats() {
        if (this.args[0] === this.GAME_STAT && this.args[2]) {
            if (this.args[1] === this.DATE_SEARCH) {
                const games: Game[] = await this.gameService.writeGamesByDate(this.args[2]);
                for (const game of games) {
                    await this.boxScoreService.writePlayerStatsByGameID(game.GAME_ID);
                    await this.boxScoreService.writeTeamStatsByGameID(game.GAME_ID);
                    await this.boxScoreService.writeStarterBenchStatsByGameID(game.GAME_ID);
                    console.log(`${game.GAMECODE} -- job completed`);
                }
            }
        } else {
            console.log('must provide correct args');
            process.exit(-1);
        }
        process.exit(0);
    }
}

let entry = new Entry(new GameService(new GameDataStore(new GameClient())),
    new BoxScoreService(new BoxScoreDataStore(new BoxScoreClient())));
entry.fetchStats();
