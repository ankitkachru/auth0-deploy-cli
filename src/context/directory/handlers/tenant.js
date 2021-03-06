import fs from 'fs-extra';
import path from 'path';

import log from '../../../logger';
import { existsMustBeDir, isFile, loadJSON } from '../../../utils';

function parse(context) {
  const baseFolder = path.join(context.filePath);
  if (!existsMustBeDir(baseFolder)) return {}; // Skip

  const tenantFile = path.join(baseFolder, 'tenant.json');

  if (isFile(tenantFile)) {
    return {
      tenant: loadJSON(tenantFile, context.mappings)
    };
  }

  return {};
}


async function dump(context) {
  const { tenant } = context.assets;

  if (!tenant) return; // Skip, nothing to dump

  const tenantFile = path.join(context.filePath, 'tenant.json');
  log.info(`Writing ${tenantFile}`);
  fs.writeFileSync(tenantFile, JSON.stringify(tenant, null, 2));
}


export default {
  parse,
  dump
};
