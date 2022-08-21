const { readdir, readFile, writeFile, access } = require("node:fs/promises");
const { constants: { R_OK, W_OK } } = require("node:fs");

const LANG_SRC = "./lang";
const LANG_DEST = "./public/assets/lang";

const booleanPromise = (promise) => promise.then(() => true).catch(() => false);

async function compress() {
    if (!await booleanPromise(access(LANG_SRC, R_OK))) {
        console.error(`Couldn't access ${LANG_SRC}: Target not readable`);
    }
    if (!await booleanPromise(access(LANG_DEST, W_OK))) {
        console.error(`Couldn't access ${LANG_DEST}: Target not writable`);
        return;
    }
    for (const file of await readdir(LANG_SRC)) {
        const content = await readFile(`${LANG_SRC}/${file}`, "utf8");
        try {
            const out = JSON.stringify(JSON.parse(content));
            await writeFile(`${LANG_DEST}/${file}`, out);
        } catch {
            console.error(`Couldn't parse ${file}. Skipping.`);
        }
    }
}

void compress();
