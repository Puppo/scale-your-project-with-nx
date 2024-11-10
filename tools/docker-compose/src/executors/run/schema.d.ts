export interface DockerComposeExecutorSchema {
  projectFile: string;
  command: 'up' | 'down'
}
