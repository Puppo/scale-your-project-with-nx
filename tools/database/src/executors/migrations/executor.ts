import type { ExecutorContext } from '@nx/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import { MigrationsOptions } from './schema';


export default async function migrationsExecutor(
  options: MigrationsOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Executing "migrations"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);

  const { stdout, stderr } = await promisify(exec)(
    `npx postgrator --config ${options.config} ${typeof options.to === 'number' ? `--to ${options.to}` : ''}`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
}
