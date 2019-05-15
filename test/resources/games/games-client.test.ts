import { expect } from 'chai';
import { GAME } from '../../responses/games-response';
import { GameClient } from '../../../src/resources/games/games-client';

const client = new GameClient();
const DATE = '2019-05-02';

describe('Games Client Test', () => {
    it('fetch player stats by game ID', async () => {
        const response = await client.fetchGamesByDate(DATE);
        expect(response).to.be.deep.equals(GAME);
    }).timeout(5000);
});