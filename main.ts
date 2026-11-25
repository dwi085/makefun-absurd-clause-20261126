import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one original absurd clause, a single English sentence of at
// most 200 characters, phrased as deadpan terms-of-service boilerplate.
// It opens exactly like real ToS ("By using the Service, you agree to..."),
// then quietly turns impossible: surrendering your shadow, with the most
// mundane bureaucratic detail possible for collecting it again.
const CLAUSE =
  "By using the Service, you agree to surrender your shadow on Tuesdays, and to collect it from reception between 9 and 5.";

// The sealed gate only accepts UTF-8 text of 1 to 200 characters, not only
// whitespace, so refuse loudly here instead of shipping an invalid entry.
if (CLAUSE.length < 1 || CLAUSE.length > 200) {
  throw new Error(`clause must be 1-200 characters, got ${CLAUSE.length}`);
}
if (CLAUSE.trim().length === 0) {
  throw new Error("clause must not be only whitespace");
}

// Write the clause exactly, with no trailing newline, so the file holds
// precisely the sentence the judge reads. Only create /output when needed;
// never delete it (the grader may already own it).
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", CLAUSE, "utf8");

// One line of proof in the run log: the exact length the gate will see.
console.log(`wrote ${CLAUSE.length} characters to /output/entry.txt`);
