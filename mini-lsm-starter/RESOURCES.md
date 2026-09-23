# LSM Storage Engine Internals — Resources

## Knowledge

### Primary (the course)
- [Mini-LSM Book — Week 1 Day 1: Memtable](https://skyzh.github.io/mini-lsm/week1-01-memtable.html)
  Alex Chi Z's chapter for the current task. Source of the framing "mutating methods such as
  `insert` require only an immutable reference to the skiplist". Use for: what each chapter
  expects you to implement, and the intended design rationale.
- [Mini-LSM Book — full table of contents](https://skyzh.github.io/mini-lsm/)
  Use for: seeing where the current chapter sits in the arc, and reading ahead one chapter only.

### Rust semantics (highest trust: the language's own reference material)
- [Rustonomicon — Aliasing](https://doc.rust-lang.org/nomicon/aliasing.html)
  Defines aliasing and states the exclusivity guarantee: "`&mut` isn't allowed to be aliased."
  Use for: the shared-vs-exclusive reframe, and why the compiler cares.
- [Rust Book Ch. 15.5 — RefCell and Interior Mutability](https://doc.rust-lang.org/book/ch15-05-interior-mutability.html)
  Use for: the concept of mutating through a shared reference, before meeting atomics.
- [Rust Std — `std::cell::UnsafeCell`](https://doc.rust-lang.org/std/cell/struct.UnsafeCell.html)
  The one primitive that makes interior mutability legal. Everything else is built on it.
  Use for: the precise rule about what may be mutated through `&T`.
- [Rust Atomics and Locks — Mara Bos (free online)](https://marabos.nl/atomics/)
  The best available book on Rust concurrency. Use for: atomics, orderings, and why
  lock-free structures are shaped the way they are. Chapters 1–2 first.

### Source code (read these, they are the ground truth)
- Local: `~/.cargo/registry/src/*/crossbeam-skiplist-0.1.3/src/base.rs`
  The real lock-free skiplist: `Node`/`Tower` layout (l. 30–140), `random_height` (l. 558),
  `search_bound` (l. 681), the insert CAS loop (l. 860–1010). Use for: how a skiplist
  actually works, as opposed to how blog posts say it works.
- Local: `~/.cargo/registry/src/*/crossbeam-skiplist-0.1.3/src/map.rs`
  The `SkipMap` public API. `insert(&self, ...)` is at l. 372. Use for: signatures.
- Local: `$(rustc --print sysroot)/lib/rustlib/src/rust/library/alloc/src/collections/btree/node.rs`
  `B = 6`, `CAPACITY = 11`, and the inline `[MaybeUninit<K>; CAPACITY]` arrays that force
  `&mut self`. Use for: the B-tree side of any comparison.
- [crossbeam-skiplist on docs.rs](https://docs.rs/crossbeam-skiplist/latest/crossbeam_skiplist/)
  Use for: quick API lookup while implementing.

### Foundational papers
- [Pugh, "Skip Lists: A Probabilistic Alternative to Balanced Trees" (CACM 1990)](https://dl.acm.org/doi/10.1145/78973.78977)
  The original. Short and readable. Use for: where the probabilistic height comes from.
  Open-access companion: [Skip List Cookbook (UMD TR)](https://webdiis.unizar.es/asignaturas/APD/skip_list_cookbook.pdf)
- [O'Neil et al., "The Log-Structured Merge-Tree (LSM-Tree)" (1996)](https://www.cs.umb.edu/~poneil/lsmtree.pdf)
  The paper the whole course descends from. Use for: why LSM trades read amplification for
  write throughput. Read once Week 1 is complete.

## Wisdom (Communities)

- [skyzh's Discord — the Mini-LSM community](https://skyzh.dev/join/discord)
  The course author's own server; the preface directs students here. Verified live 2026-09-09.
  Use for: "is my design reasonable?" questions, and comparing implementations after you
  have written your own.
- [r/rust](https://www.reddit.com/r/rust/) — high-signal, well moderated.
  Use for: borrow-checker and lifetime questions, where the answers are usually excellent.
- [Rust Community Discord — #beginners and #black-magic](https://discord.gg/rust-lang-community)
  Use for: fast answers on lifetimes; `#black-magic` for unsafe/atomics questions.
- [The Rust Users Forum](https://users.rust-lang.org/) — slower, more considered than chat.
  Use for: posting a whole design and getting a structured critique.

## Gaps

- No trusted secondary source yet for *concurrent B-trees* (Bw-tree, B-link tree). Needed if
  the "why not just make BTreeMap lock-free?" question is pursued further.
- No resource yet on `ouroboros` / self-referential structs, which Week 1 Day 2 requires.
