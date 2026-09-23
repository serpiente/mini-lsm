# Mission: LSM Storage Engine Internals (via Mini-LSM, in Rust)

## Why
Sergio wants to read, reason about, and debug real LSM storage engines (RocksDB, Pebble,
Cassandra) the way an insider does — and is using Mini-LSM as the hard, realistic vehicle
for becoming genuinely good at Rust's ownership model and lock-free concurrency at the
same time. Both halves matter: the storage engine is the destination, Rust is the road.

## Success looks like
- Can explain, without notes, why an LSM engine's write path is a memtable + WAL + flush, and what each buys.
- Can pick up an unfamiliar concurrent Rust data structure and predict its method signatures from its memory layout.
- Completes each Mini-LSM chapter with an implementation reasoned from first principles, not pattern-matched from the reference solution.
- Can read a RocksDB or Pebble source file and recognise the Mini-LSM concept underneath it.

## Constraints
- Rust ownership and lifetimes still cost real effort — the borrow checker is the active bottleneck, not the LSM concepts.
- Lessons must be short. Working memory is the scarce resource, not motivation.
- Teaching tracks the course: currently Week 1, Day 1 (memtable).

## Out of scope
- Distributed systems concerns (replication, consensus, sharding). Single-node engine only.
- Writing production-grade `unsafe` Rust. Reading it to understand a design is in scope; authoring it is not.
- SQL query planning and execution. The storage layer is the subject.
