#!/usr/bin/env node

// File System
const fs = require('fs');

// File Name
const defaultFilename = 'catch-notes';
const fileformat = 'txt';
const inputFilename = process.argv[2];
const filename = inputFilename ? `catch-${inputFilename}` : defaultFilename;
const file = filename + '.' + fileformat;

// Readline API
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
const prompt = '  > '


function handleEmptyLine(line) {
    rl.close();
}

function handleLine(line) {

    // Handle empty lines
    if (line === '') {
        handleEmptyLine(line);
        return;
    }

    // Handle non-empty lines and prompt again.
    captureLine(line);
    rl.prompt();
}

function captureLine(line) {

    // Add a line break.
    line = line + '\n';

    // Write line to specified file.
    fs.appendFile(file, line, err => {
        if (err) throw err;
    });

}

function captureNewline() {

    // Add a line break.
    line = '\n';

    // Write line to specified file.
    fs.appendFile(file, line, err => {
        if (err) throw err;
    });
}

function handleClose() {
    process.exit(0);
}

function setupPromptLoop() {
    rl.setPrompt(prompt);
    rl.on('line', line => { handleLine(line) });
    rl.on('close', handleClose);
}

function startPromptLoop() {
    process.stdout.write('\n');
    rl.prompt();
}

function main() {
    captureNewline();
    setupPromptLoop();
    startPromptLoop();
}

main();


