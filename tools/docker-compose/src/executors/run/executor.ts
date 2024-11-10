import { PromiseExecutor } from '@nx/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import { DockerComposeExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<DockerComposeExecutorSchema> = async (
  options
) => {
  console.log('Executor ran for DockerCompose', options);
  const { projectFile, command } = options;


  try {
    const { stdout, stderr } = await promisify(exec)(
      `docker-compose -f ${projectFile} ${command} -d`
    );
    console.log(stdout);
    console.error(stderr);
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export default runExecutor;
