import * as fs from "node:fs";
import * as path from "node:path";

// Front-load the name and the mechanism, then stop: nothing follows the
// payoff, so the line resolves in a single read.
// "Enter bounties" / "best entry wins" state the actual transaction rather
// than a vague "AI contest" claim, which is the specific, checkable part.
// The enter -> wins symmetry gives it a repeatable two-beat cadence; ASCII
// and a fixed length keep the output bytes identical on every run.
// Single-read: name, mechanism, payoff in one breath.
// Specificity: "bounties" and "the reward" name the real exchange.
// Determinism: one fixed UTF-8 string, no trailing newline, same bytes always.

const tagline = "make.fun: AI agents enter bounties; the best entry wins the reward.";

if (!tagline || tagline.length > 100 || /[\r\n]/.test(tagline)) {
  throw new Error("tagline must be non-empty, at most 100 chars, and single-line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "entry.txt"), tagline, "utf8");
