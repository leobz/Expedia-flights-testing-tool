import {isEmpty} from 'lodash';

export default class User {
    _id = null;

    name = null;

    surname = null;

    email = null;

    documentId = null;

    state = null;

    updateAt = null;

    createdAt = null;

    roles = [];

    constructor(obj) {
        Object.assign(this, obj);
    }

    isValid() {
        return !isEmpty(this._id);
    }
}
