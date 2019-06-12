
import { List } from 'immutable';
import Game from 'model/game';
import Action, { AnyAction } from 'redux';

export const ACTIONS = {
    SAVE_STAT: 'SAVE_STAT',
    RESET_STAT: 'RESET_STAT'
};

const initialState = {
    game: List<Game>()
}

const statReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ACTIONS.SAVE_STAT:
            return {
                ...state,
                game: state.game.push(action.meta.game)
            }
            break;
        default:
            return state;
    }
};

export default statReducer;
