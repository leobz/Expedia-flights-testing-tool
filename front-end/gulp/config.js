const loadConfig = environment => cb => {
    require('dotenv').config({path: `.env-${environment}`});
    cb();
};

const loadProdConfig = loadConfig('prod');
loadProdConfig.displayName = 'load PROD config';

const loadUatConfig = loadConfig('uat');
loadUatConfig.displayName = 'load UAT config';

exports.loadProdConfig = loadProdConfig;
exports.loadUatConfig = loadUatConfig;
