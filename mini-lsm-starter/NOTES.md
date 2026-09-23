# Working Notes

## How Sergio wants to be taught
- **Mission is dual**: storage-engine fluency *and* Rust concurrency mastery. A lesson that
  only serves one is half a lesson. Prefer lessons where the Rust insight is *load-bearing*
  for the storage-engine design.
- **Borrow checker is the active bottleneck** (self-reported, 2026-09-09). Do not assume
  interior mutability, `Send`/`Sync` as traits, or atomic orderings. Build them up.
- **Short lessons.** Working memory is the constraint. One tangible win per lesson.
- **Reads source.** Asked specifically for *implementation* differences, not API differences.
  Ground claims in real source with file and line numbers; he will go look.
- Asks precise, well-posed questions. Answer the question actually asked before widening.

## Terminology watch
- He used "immutable references" for `&self`. That phrasing is the standard one in the
  Mini-LSM book too, so it is not his error — but "shared reference" is the load-bearing
  term. Corrected in [[lessons/0001]]; keep using "shared" consistently from here.

## Course position
- Week 1, Day 1 (memtable). `src/mem_table.rs` still all `unimplemented!()`.
- `src/tests/harness.rs` and `src/tests/week1_day1.rs` present; `src/tests.rs` modified.
- Next chapters, for planning lessons ahead: Day 2 is the memtable iterator, which needs
  `ouroboros` self-referential structs — a lifetime-heavy topic. Expect that to be the
  next real difficulty spike, and prepare for it before he hits it.

## Open threads to teach later
- Why `SkipMap::get` returns `Entry<'_, K, V>` rather than `&V` (epoch-based reclamation,
  reference counting in `refs_and_height`). Deliberately deferred out of lesson 0001.
- `Send` + `Sync`: what makes `SkipMap` safe to share across threads at all.
- The `ouroboros` self-referential iterator (Week 1 Day 2).
- Why a lock-free B-tree is genuinely hard (multi-word structural updates) — the honest
  answer to "so why not just make BTreeMap concurrent?"

## Workspace conventions
- Lessons link `../assets/lesson.css` and `../assets/lesson.js` rather than inlining, so the
  course looks like one artefact. They open fine over `file://`.
- Open a lesson with: `open lessons/<file>.html`
