import { expect } from 'chai';
import { PlayerStats, TeamStats, StarterBenchStats } from '../../responses/boxscore-response';
import { BoxScoreClient } from '../../../src/resources/boxscore/boxscore-client';

const client = new BoxScoreClient();
const GAME_ID = '0041800232';

describe('Boxscore Client Test', () => {
    it('fetch player stats by game ID', async () => {
        const response = await client.fetchPlayerStatsByGameID(GAME_ID);
        expect(response).to.be.deep.equals(PlayerStats);
    }).timeout(5000);

    it('fetch team stats by game ID', async () => {
        const response = await client.fetchTeamStatsByGameID(GAME_ID);
        expect(response).to.be.deep.equals(TeamStats);
    }).timeout(5000);

    it('fetch starter bench stats by game ID', async () => {
        const response = await client.fetchStarterBenchStatsByGameID(GAME_ID);
        expect(response).to.be.deep.equals(StarterBenchStats);
    }).timeout(5000);
});