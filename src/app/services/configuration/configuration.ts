
export const configurations = ['DELETE_INITIAL_QUOTE'] as const
// export const Configuration  = z.enum(configurations);
export type ConfigurationType  = typeof configurations[number]
