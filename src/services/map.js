import { pipe, map } from 'ramda'

export const createTruthMapUsingArrayOfKeys = pipe(
  map((item) => [item, true]),
  (entries) => new Map(entries)
)
