import { promisify } from 'util';
import fs from 'fs';
import yaml from 'yaml';

export default async function readConfig () {
  const configPath = process.env.NODE_ENV == 'test' ? './test-config.yaml' : './events-config.yaml';
  const readFile = promisify(fs.readFile);
  const file = await readFile(configPath, 'utf8');

  const config = yaml.parse(file);

  Object.keys(config.events).forEach((eventSlug) => {
    const tokenEnv = config.events[eventSlug]['tito-signature-validator-env'];
    config.events[eventSlug]['tito-token'] = process.env[tokenEnv];
  });

  return config;
};
