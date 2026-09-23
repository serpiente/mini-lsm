# Mission established: dual-track (storage engines + Rust), with the borrow checker as the bottleneck

Sergio's mission for Mini-LSM is deliberately two-track: **storage-engine fluency** (read and debug
real LSM engines the way an insider does) *and* **Rust concurrency mastery**, using the course as
the vehicle for both. He selected both outcomes explicitly rather than one.

Self-reported Rust baseline (2026-09-09): **"still fighting the borrow checker"** — ownership and
lifetimes still cost real effort. This is the binding constraint on lesson design, and it is *lower*
than his storage-engine ambition, which means lessons should route storage-engine insights *through*
Rust semantics rather than treating Rust as incidental plumbing.

## Implications
- Do not assume interior mutability, `Send`/`Sync` as traits, atomic orderings, or `UnsafeCell`.
  Introduce each explicitly the first time it is load-bearing.
- Prefer lessons where a Rust concept and an engine design decision are the *same* insight. Lesson
  0001 is the template: `&self` semantics and "the memtable needs no mutex" are one fact.
- Week 1 Day 2 (`ouroboros`, self-referential structs, lifetime-heavy) is the next predicted
  difficulty spike and sits directly on the weak axis. Prepare for it before he arrives.
- He asked for *implementation* differences unprompted and reads source. Cite file and line; he
  will check. This raises the ceiling on how deep lessons can go, despite the Rust baseline.

See [[MISSION.md]], [[NOTES.md]].
