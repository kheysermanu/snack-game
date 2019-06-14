import Game from 'model/game';
import { ACTIONS } from 'reducers/stat.reducer';

export const saveStat = (game: Game) => (dispatch: any) => {
    dispatch({
        type: ACTIONS.SAVE_STAT,
        meta: { game }
    });
}
