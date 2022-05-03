import log from "loglevel"
import { transform } from "./image"
import { findPrime } from "./primeSearch"
import commandExists from 'command-exists'

/** @param {{ number?: string, sophie?: boolean, image?: string, pixels?: string, width?: string, contrast?: string, video?: string, export?: 'json' | 'prime', quiet?: boolean }} options */
export async function run(options) {
    if (options.quiet) log.setLevel('info')
    else log.setLevel('debug')

    if (!await commandExists('openssl').then(() => true).catch(() => false)) throw new Error('You must have openssl in your path for this program to work.')

    if (!options.number && !options.image) throw new Error('Either a number or an image must be specified.')
    
    let number = options.number;
    if (options.image) {
        number = (await transform(options.image, {
            pixels: options.pixels,
            width: +(options.width ?? 0),
            contrast: +(options.contrast ?? 0)
        })).replace(/\n/g, '')
    }
    
    // @ts-ignore
    const result = await findPrime(number, options.sophie)
    return result;
}
