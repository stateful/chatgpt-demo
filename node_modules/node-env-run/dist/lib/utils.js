"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeArguments = exports.constructNewArgv = exports.setEnvironmentVariables = exports.getScriptToExecute = void 0;
const Debug = require("debug");
const fs = require("fs");
const path_1 = require("path");
const debug = Debug('node-env-run');
function getScriptToExecute(script, cwd) {
    if (script === '.') {
        debug('Evalute package.json to determine script to execute.');
        const pathToPkg = path_1.resolve(cwd, 'package.json');
        if (!fs.existsSync(pathToPkg)) {
            debug('could not find package.json');
            return null;
        }
        const pkg = JSON.parse(fs.readFileSync(pathToPkg, 'utf8'));
        if (!pkg.main) {
            console.error('Could not find a "main" entry in the package.json');
            return null;
        }
        script = path_1.resolve(cwd, pkg.main);
    }
    else {
        script = path_1.resolve(cwd, script);
    }
    return script;
}
exports.getScriptToExecute = getScriptToExecute;
function setEnvironmentVariables(readValues, force = false) {
    if (force) {
        debug('Force overriding enabled');
    }
    const envKeysToSet = Object.keys(readValues).filter((key) => {
        if (force && typeof readValues[key] !== 'undefined') {
            const val = readValues[key];
            if (typeof val === 'string' && val.length === 0) {
                debug(`Not overriding ${key}`);
                return false;
            }
            debug(`Overriding ${key}`);
            return true;
        }
        return !process.env[key];
    });
    envKeysToSet.forEach((key) => {
        process.env[key] = readValues[key];
    });
    debug(`Set the env variables: ${envKeysToSet.map((k) => `"${k}"`).join(',')}`);
}
exports.setEnvironmentVariables = setEnvironmentVariables;
function constructNewArgv(currentArgv, script, newArguments) {
    const [node] = currentArgv;
    return [node, script, ...newArguments.split(' ')];
}
exports.constructNewArgv = constructNewArgv;
const REGULAR_SHELL_CHARACTERS = ['a-z', 'A-Z', '1-9', '-', '_', '/', ':', '='];
const REGEX_NOT_REGULAR_CHARACTER = new RegExp(`[^${REGULAR_SHELL_CHARACTERS.join('')}]`);
function escapeArguments(args) {
    const escapedArguments = args.map((arg) => {
        if (arg.match(REGEX_NOT_REGULAR_CHARACTER)) {
            return `"${arg}"`;
        }
        return arg;
    });
    return escapedArguments;
}
exports.escapeArguments = escapeArguments;
