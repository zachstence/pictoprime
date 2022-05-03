import { run } from "$lib/run"
import type { RequestHandler } from "@sveltejs/kit"

import { execSync } from "child_process"

export const post: RequestHandler = async () => {
    const result = await run({
        image: "/home/zach/code/pictoprime/examples/headshot.png",
        quiet: false,
    })

    // const result = await execSync("echo hello")

    console.log(result.toString())

    return {
        body: {
            // result: result.toString()
            result,
        },
    }
}
