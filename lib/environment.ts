export enum NodeEnv {
  Development = "development",
  Production = "production",
  Test = "test",
}

const nodeEnv = (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.Development;

export const appEnv = {
  nodeEnv,
  isProd: nodeEnv === NodeEnv.Production,
  isDev: nodeEnv === NodeEnv.Development,
  isTest: nodeEnv === NodeEnv.Test,
};
