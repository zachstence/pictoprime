#!/usr/bin/env node
// @ts-check

import { Command, Option } from 'commander'
import log from 'loglevel'

import { run } from './run'

const program = new Command()
program.version('1.0.3').name('pictoprime').description('A program to find picture-esque primes. Requires openssl.')

const outputOption = new Option('-x, --export <mode>', 'The output format').choices(['json', 'prime']).default('json')

program
    .option('-n, --number <number>', 'The number to be transformed into a prime.')
    .option('-i, --image <image>', 'Use an image to find primes.') 
    .option('-q, --quiet', 'Hides some of the debug information to make it easier to get output from this program.')
    .addOption(outputOption)
    .option('--pixels <pixels>', 'The numbers to use to generate the prime (image mode). Left side is lighter, right side is darker.', '7772299408')
    .option('--width <width>', 'The width of the ascii to generate (image mode).', '32')
    .option('--contrast <contrast>', 'Additional contrast to apply between -1.0 and 1.0 (image mode).', '0.1')
    .option('-s, --sophie', 'Enable the search for an (almost) Sophie Germain prime (useful for Discrete Log cryptography).',)

program.parse(process.argv)

/** @type {{ number?: string, sophie?: boolean, image?: string, pixels?: string, width?: string, contrast?: string, video?: string, export?: 'json' | 'prime', quiet?: boolean }} */
const options = program.opts()

async function main() {
    const result = await run(options)

    log.info(options.export === 'json' ? JSON.stringify(result, undefined, 2) : result.prime)
}

main()
