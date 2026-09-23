---
status: active
---

# Misconception addressed: `&T` read as "immutable reference" rather than "shared reference"

Sergio asked "why is skiplist immutable references" — the phrasing itself carried the
misconception, treating `&T` as a guarantee about *mutation* rather than about *aliasing*. Taught
in [[lessons/0001-shared-not-immutable]]: the axis is shared vs exclusive, the enforced invariant is
"no aliasing and mutation at once", and interior mutability (`UnsafeCell`) is the second legal door
to mutation.

Note this is **not** his error to own — the Mini-LSM book uses "immutable reference" in the same
place, so the source material seeded it. Worth saying so, so the correction doesn't read as a
rebuke.

## Evidence
Not yet demonstrated. Lesson delivered; three quiz items and one free-recall prompt are the check.
**Status is "taught", not "learned"** — do not treat as a floor until he produces the
layout → signature causal chain unprompted, or applies it to a structure not covered in the lesson.

## Implications
- Once evidenced, this unlocks: `Send`/`Sync`, atomic orderings, and the `Entry`/epoch-reclamation
  story (why `SkipMap::get` returns a guard, not a `&V`) — deliberately deferred out of lesson 0001
  and flagged there as an open question for lesson 0002.
- If it did *not* land, the fallback is a narrower lesson on `Cell`/`RefCell` before returning to
  atomics — interior mutability without the concurrency.
- Terminology decision for this workspace: use **"shared reference"** everywhere from now on, even
  though quoted course material says "immutable". Recorded in [[NOTES.md]].
