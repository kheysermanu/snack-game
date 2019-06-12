import Game from 'model/game';
import { ACTIONS } from 'reducers/stat.reducer';

export const saveStat = (game: Game) => (dispatch: (arg0: { type: string; meta: Game; }) => void) => {
    dispatch({
        type: ACTIONS.SAVE_STAT,
        meta: game
    });
};
