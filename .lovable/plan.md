# About-page lattice motion confirmation

## Scope
- Strengthen node drift, connection reformation, and signal pulses only on the About page.
- Preserve the existing violet/teal palette, lattice topology, imagery, and reduced-motion freeze.
- Do not change the lattice behavior on other pages yet.

## Implementation
- Add an explicit enhanced-motion mode to the shared lattice and section wrapper, enabled only by `/about`.
- Increase drift amplitude roughly 3–4× while keeping smooth deterministic loops.
- Make paired base and alternate connections clearly exchange every 6–8 seconds, with alternate endpoints visibly different.
- Slightly enlarge and brighten the existing staggered traveling pulses.

## Verification
- Check normal motion and `prefers-reduced-motion: reduce` behavior in the live preview.
- Record exactly 20 seconds of the About page so at least two reformation cycles can be compared.
- Inspect sampled frames and provide the MP4 for review before any wider rollout.
