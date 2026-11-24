import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Real-Life Patch Notes: The Comedy Changelog
// One line, at most 160 characters, written to /output/entry.txt.
const MAX_CHARS = 160;

const LINE =
  "v1.9.4: fixed a bug where one yawn in a meeting propagated to all nearby humans with no rate limit.";

// Validate the entry the way the gate will: a single non-blank line of
// 1..160 characters, so a bad line fails loudly here instead of at grading.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(
      `patch note is ${line.length} chars, must be 1..${MAX_CHARS}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("patch note must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("patch note must not be only whitespace");
  }
}

validateLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(
  `wrote ${LINE.length}-char patch note to ${join(outDir, "entry.txt")}`,
);
