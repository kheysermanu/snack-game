
import { List } from 'immutable';
import Game from 'model/game';
import Action from 'redux';

export const ACTIONS = {
    SAVE_STAT: 'SAVE_STAT',
    RESET_STAT: 'RESET_STAT'
};

const initialState = {
    game: List<Game>()
}

export const statReducer = (state = initialState, action: any) => {

};
