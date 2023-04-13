"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.parseArgs = void 0;
const common_tags_1 = require("common-tags");
const Debug = require("debug");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const yargs = require("yargs");
const utils_1 = require("./utils");
const debug = Debug('node-env-run');
const cwd = process.cwd();
const usageDescription = common_tags_1.stripIndent `
  Runs the given script with set environment variables. 
  * If no script is passed it will run the REPL instead.
  * If '.' is passed it will read the package.json and execute the 'main' file.

  Pass additional arguments to the script after the "--"
`;
function parseArgs(argv) {
    const result = yargs
        .usage('$0 [script]', usageDescription, (yargs) => {
        yargs.positional('script', {
            describe: 'the file that should be executed',
            type: 'string',
        });
        yargs.example('$0 --exec "python"', 'Runs the Python REPL instead');
        yargs.example('$0 server.js --exec "nodemon"', 'Runs "nodemon server.js"');
        yargs.example('$0 someScript.js -- --inspect', 'Run script with --inspect');
        return yargs;
    })
        .option('force', {
        alias: 'f',
        demandOption: false,
        describe: 'temporarily overrides existing env variables with the ones in the .env file',
    })
        .option('env', {
        alias: 'E',
        demandOption: false,
        describe: 'location of .env file relative from the current working directory',
        default: '.env',
        type: 'string',
    })
        .option('verbose', {
        demandOption: false,
        describe: 'enable verbose logging',
        type: 'boolean',
    })
        .option('encoding', {
        demandOption: false,
        describe: 'encoding of the .env file',
        default: 'utf8',
        type: 'string',
    })
        .option('exec', {
        alias: 'e',
        demandOption: false,
        describe: 'the command to execute the script with',
        default: 'node',
    })
        .showHelpOnFail(true)
        .help('help')
        .strict()
        .version()
        .parse(argv.slice(2));
    const script = result.script;
    result.newArguments = result._;
    debug('Yargs Result %o', result);
    return { program: result, script };
}
exports.parseArgs = parseArgs;
function init(args) {
    const { program, script } = args;
    const envFilePath = path.resolve(cwd, program.env);
    if (!fs.existsSync(envFilePath)) {
        const error = new Error(`Could not find the .env file under: "${envFilePath}"`);
        return { isRepl: false, error };
    }
    debug('Reading .env file');
    const envContent = fs.readFileSync(path.resolve(cwd, program.env), program.encoding);
    const envValues = dotenv.parse(envContent);
    utils_1.setEnvironmentVariables(envValues, program.force);
    if (!script || script === 'REPL') {
        const node = args.program.exec === undefined;
        return { isRepl: true, node };
    }
    const scriptToExecute = utils_1.getScriptToExecute(script, cwd);
    if (scriptToExecute === null || !fs.existsSync(scriptToExecute)) {
        const error = new Error('Failed to determine script to execute');
        return { isRepl: false, error };
    }
    return { isRepl: false, script: scriptToExecute };
}
exports.init = init;
