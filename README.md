# substrate-traverse

traverse observation primitive: walk a cell-graph following links.

## What it does

This package walks the **cell-graph** substrate primitive.

The implementation is **deterministic**: once recorded, the observation persists in the witness-log with its prev_hash chain. This is the substrate's structural defense against memory-poisoning attacks (see [arXiv 2605.08442](https://arxiv.org/abs/2605.08442)) — every observation is hash-chained to its parent, making forgery detectable.

## Install

```bash
npm install @superinstance/substrate-traverse
```

## Usage

```js
const { /* exports */ } = require('@superinstance/substrate-traverse');
// See index.js for the full API.
```

## In the fleet

This is one of 16+ substrate-* packages in the SuperInstance fleet. All of them depend transitively on [`@superinstance/substrate-foundation`](https://github.com/SuperInstance/substrate-foundation), which exports the 11-opcode canon and the FNV-1a 64-bit canary hash (`0x024a555471370b18d`).

## Cross-language reproducibility

The substrate is implemented in four languages with byte-exact parity:
- **TypeScript** (this package, JavaScript)
- **Rust** (paired crates with `-rs` suffix)
- **Python** (`cargo_line_tycoon_substrate`)
- **C99** (embedded systems)

The same FNV-1a 64-bit canary hash, the same opcode semantics, the same trust math. Verified by `tests/stress/01_fnv1a64_fuzz.js` (29 pathological inputs, all green).

## License

MIT
