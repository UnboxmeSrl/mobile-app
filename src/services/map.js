import { map,pipe } from 'ramda'

export const createTruthMapUsingArrayOfKeys = pipe(
  map((item) => [item, true]),
  (entries) => new Map(entries)
)
