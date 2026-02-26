// components/index.js
import components from './src/index';

export * from './src/index';

export default {
  install: (app: any) => components.forEach((c: any) => app.use(c)),
};
