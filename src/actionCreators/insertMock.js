import getMock from '../getMock';
import { EDIT_REQUEST } from '../reducer';

export function insertMock({ dispatch, inputType, types }) {
    dispatch({
        type: EDIT_REQUEST,
        requestText: JSON.stringify(getMock({ inputType, types }), null, 2),
    });
}
