declare module 'jsonp' {
  function jsonp(
    url: string,
    options: any,
    callback: (err: Error | null, data: any) => void
  ): void;
  export = jsonp;
}
