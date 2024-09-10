interface Options<T> {
  start: (config: T) => Promise<void>
  build: (config: T) => Promise<void>
}

const isFunction = (value: any): value is (() => any) => typeof value === 'function'

export function defineBuilder<T>(config: T, options: Options<T> | (() => Options<T>)) {
  if (isFunction(options))
    options = options()

  return {
    start: () => options.start(config),
    build: () => options.build(config),
  }
}
