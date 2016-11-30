#!/usr/bin/env node
'use strict';

process.env.NODE_ENV = 'production';

const { publicFolder } = require('unleash-frontend');
const program = require('commander');
const unleash = require('../lib/server-impl.js');

program
    .option('-p, --port <port>', 'The port you want to start unleash on')
    .option('-d, --databaseUri <databaseUri>', 'The full databaseUri to connect to, including username and password')
    .parse(process.argv);

unleash.start({
    databaseUri: program.databaseUri || process.env.DATABASE_URL,
    port: program.port || process.env.PORT || 4242,
    publicFolder,
}).then(conf => {
    console.log(`Unleash started on port:${conf.app.get('port')}`);
});
