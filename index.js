// substrate-traverse: TRAVERSE opcode (third form of forgetting)
// Walks the witness log along typed edges (predicates) starting from a given
// observation. Returns the trail as a sequence of observation IDs.

const { WitnessLog } = require('@superinstance/substrate-witness-log');

function traverse(log, startObsId, predicate, opts = {}) {
  const maxDepth = opts.maxDepth ?? 100;
  const direction = opts.direction || 'forward'; // 'forward' | 'backward' | 'both'
  
  const startEntry = log.findById(startObsId);
  if (!startEntry) throw new Error(`traverse: start observation ${startObsId} not in log`);

  const trail = [{ seq: startEntry.seq, obs: startObsId }];
  const visited = new Set([startObsId]);

  // For real witness logs, edges come from explicit attest/contest/revoke observations
  // This simplified version walks by predicate match in the observation's subject/object
  const entries = direction === 'backward' ? [...log.entries].reverse() : log.entries;

  for (const entry of entries) {
    if (trail.length >= maxDepth) break;
    if (entry.seq <= startEntry.seq) continue;
    
    // Look for observations that mention startObsId in their counter/revokes fields
    // Or share subject with the predicate
    const obs = entry.observation;
    const matchesPredicate = obs?.predicate === predicate || obs?.counters === startObsId || obs?.revokes === startObsId;
    if (!matchesPredicate) continue;
    
    if (visited.has(obs.id)) continue;
    trail.push({ seq: entry.seq, obs: obs.id });
    visited.add(obs.id);
  }

  return {
    start: startObsId,
    predicate,
    direction,
    trail,
    visited_count: visited.size,
  };
}

module.exports = { traverse };
