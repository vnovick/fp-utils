export default function curry(fn, ...args) {
  let _curry = (args) => {
    return args.length < fn.length
      ? (..._args) => _curry([...args, ..._args])
      : fn(...args);
  }
  return _curry(args);
}