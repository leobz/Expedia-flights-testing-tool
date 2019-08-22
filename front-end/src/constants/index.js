import {includes} from 'lodash';

const USERS_CREDENTIALS_ROUTE = '/users/credentials';
const PROJECT_TITLE = 'Muestra Maestra Urbana de Viviendas de la República Argentina';
const MMUVRA_URI = 'www.indec.gob.ar/mmuvra';

const types = {
    AREA: 1,
    UPS: 2
};

const roles = {
    NATIONAL_COORDINATOR: 'cn',
    NATIONAL_COORDINATOR_RO: 'ro',
    COORDINATOR: 'co',
    SUB_COORDINATOR: 'sc',
    SUPERVISOR: 'su',
    POLLSTER: 'po'
};

const getRoleName = user => {
    if (includes(user.roles, roles.NATIONAL_COORDINATOR)) {
        return 'Coordinador Nacional';
    }
    if (includes(user.roles, roles.NATIONAL_COORDINATOR_RO)) {
        return 'Coordinador Nacional (SL)';
    }
    if (includes(user.roles, roles.COORDINATOR)) {
        return 'Coordinador Provincial';
    }
    if (includes(user.roles, roles.SUB_COORDINATOR)) {
        return 'Subcoordinador Provincial';
    }
    if (includes(user.roles, roles.SUPERVISOR)) {
        return 'Supervisor';
    }
    return 'Actualizadores';
};

const directRole = user => {
    if (user && includes(user.roles, roles.NATIONAL_COORDINATOR)) {
        return roles.NATIONAL_COORDINATOR;
    }
    if (user && includes(user.roles, roles.NATIONAL_COORDINATOR_RO)) {
        return roles.NATIONAL_COORDINATOR_RO;
    }
    if (user && includes(user.roles, roles.COORDINATOR)) {
        return roles.COORDINATOR;
    }
    if (user && includes(user.roles, roles.SUB_COORDINATOR)) {
        return roles.SUB_COORDINATOR;
    }
    if (user && includes(user.roles, roles.SUPERVISOR)) {
        return roles.SUPERVISOR;
    }
    return roles.POLLSTER;
};


const areaStateTranslate = [
    {_id: 1, description: 'Asignada'},
    {_id: 2, description: 'En Campo'},
    {_id: 3, description: 'Cerrada'},
    {_id: 4, description: 'En supervición'},
    {_id: 5, description: 'Supervisada'},
    {_id: 6, description: 'Aprobada'},
    {_id: 7, description: 'Terminada'}
];

const reviewModalsEnum = {
    SUPERVISION_AREA: 'supervisionArea',
    APPROVE_AREA: 'approveArea',
    REOPEN_AREA: 'reopenArea',
    REOPEN_SUPERVISION_AREA: 'reopenSupervisionArea',
    REASSIGN_AREA: 'reassignArea',
    DONE_AREA: 'doneArea',
    SAVE_CHANGES: 'saveChanges',
    CLEAR_AREA: 'clearArea',
    FINISH_AREA: 'finishArea'
};

const dwellingModal = {
    EDIT_BLOCK: 'EDIT_BLOCK',
    EDIT_SIDE: 'EDIT_SIDE'
};

const unlockModalsEnum = {
    OPEN_ALL_AREAS: 'OPEN_ALL_AREAS',
    OPEN_AREA: 'OPEN_AREA'
};

const sampleType = [
    {_id: 'ORIGINAL', label: 'M. Maestra'},
    {_id: 'NORMAL', label: 'M. Actualizadores'},
    {_id: 'TRANSITORY', label: 'M. Supervisor'}
];

const DEFAULT_PAGE_SIZE = 30;

const areaStatus = {
    UNASSIGNED: 0,
    OPEN: 1,
    IN_PROGRESS: 2,
    CLOSED: 3,
    SUPERVISION: 4,
    SUPERVISED: 5,
    APPROVED: 6,
    DONE: 7
};

const messages = {
    INVALID_BLOCK: '​El número ingresado es mayor a 999 o está acompañado de Letra.',
    INVALID_ZIP_CODE: 'El código de la calle no es válido.',
    INVALID_POSTAL_CODE: 'El código postal es menor/igual a 0 o no es un numero.',
    INVALID_POSTAL_CODE_AND_ZIP_CODE: 'El código postal y el código de calle son invalidos.'
};

const warningsAndErrors = {
    CODE: 'Código Incorrecto',
    CP: 'Código Postal Faltante',
    IN: 'Número Inicial igual a 0 o Faltante',
    FN: 'Número Final igual a 0 o Faltante',
    SIDE_ADDED: 'Lado Nuevo',
    SIDE_EDITED: 'Lado Modificado',
    SIDE_DELETED: 'Lado Borrado',
    SIDE_CLOSED: 'Lado Confirmado',
    DWELLING_ADDED: 'Vivienda Nueva',
    DWELLING_EDITED: 'Vivienda Modificada',
    DWELLING_DELETED: 'Vivienda Borrada',
    DWELLING_CLOSED: 'Vivienda Confirmada'
};

const deleteCodes = [
    {value: 'None', label: 'Seleccione un Código'},
    {value: 'BA', label: 'BA - Baldío'},
    {value: 'CA', label: 'CA - Const. activa'},
    {value: 'CP', label: 'CP - Const. Paralizada'},
    {value: 'CO', label: 'CO - Colectiva sin hogar particular'},
    {value: 'DE', label: 'DE - Doble o más entradas'},
    {value: 'DM', label: 'DM - Demolida'},
    {value: 'FA', label: 'FA - Fuera de área'},
    {value: 'FD', label: 'FD - Fin de semana'},
    {value: 'IN', label: 'IN - Inexistente'},
    {value: 'LO', label: 'LO - Local'},
    {value: 'RO', label: 'RO - Recorte operativo'},
    {value: 'VE', label: 'VE - Vivienda establecimiento'}
];

export {areaStatus};
export {roles};
export {warningsAndErrors};
export {sampleType};
export {areaStateTranslate};
export {reviewModalsEnum};
export {dwellingModal};
export {unlockModalsEnum};
export {DEFAULT_PAGE_SIZE};
export {getRoleName};
export {directRole};
export {deleteCodes};
export {types};
export {PROJECT_TITLE};
export {MMUVRA_URI};
export {messages};
export {USERS_CREDENTIALS_ROUTE};
