import { z } from 'zod'

export const configurations = ['DELETE_INITIAL_QUOTE'] as const
export const Configuration  = z.enum(configurations);
