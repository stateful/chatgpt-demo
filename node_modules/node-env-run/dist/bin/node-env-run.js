#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = require("cross-spawn");
const Debug = require("debug");
const repl_1 = require("repl");
const cli_1 = require("../lib/cli");
const utils_1 = require("../lib/utils");
const debug = Debug('node-env-run');
function runCommand(cmd, cmdArgs) {
    const shell = process.env.SHELL || true;
    debug(`Execute command: "${cmd}"`);
    debug(`Using arguments: "%o"`, cmdArgs);
    debug(`Using shell: "${shell}"`);
    const child = cross_spawn_1.spawn(cmd, cmdArgs, {
        shell,
        stdio: 'inherit',
        env: process.env,
    });
    child.on('exit', (code) => {
        debug(`Child process exit with code ${code}`);
        process.exit(code);
    });
}
debug(`Raw args: %o`, process.argv);
const args = cli_1.parseArgs(process.argv);
debug(`Parsed args: %o`, args.program._);
debug(`Parsed script: "${args.script}"`);
const cli = cli_1.init(args);
if (cli.isRepl) {
    if (cli.node && args.program.newArguments.length === 0) {
        repl_1.start({});
    }
    else {
        const cmdArgs = utils_1.escapeArguments(args.program.newArguments);
        runCommand(args.program.exec, cmdArgs);
    }
}
else if (cli.script !== undefined) {
    const cmd = args.program.exec;
    const cmdArgs = utils_1.escapeArguments([cli.script, ...args.program.newArguments]);
    runCommand(cmd, cmdArgs);
}
else {
    console.error(cli.error);
    process.exit(1);
}
