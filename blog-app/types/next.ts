export type ReturnTypeGetStaticProps<Func extends (...args: any) => any> = Awaited<ReturnType<Func>>['props'];