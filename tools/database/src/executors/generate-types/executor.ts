import { PromiseExecutor } from '@nx/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import { GenerateTypesExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<GenerateTypesExecutorSchema> = async (
  options
) => {
  console.log('Executor ran for GenerateTypes', options);
  const { stdout, stderr } = await promisify(exec)(
    `kysely-codegen --env-file ${options.envFile} --out-file ${options.output}`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
};

export default runExecutor;
