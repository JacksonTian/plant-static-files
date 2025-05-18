import path from 'path';
import fs from 'fs';

import { stat } from 'fs/promises';

/**
 * Used config key: assetsPrefix
 * @param {*} ctx 
 * @param {*} app 
 * @param {*} next 
 * @returns 
 */
export default async function (ctx, app, next) {
  const prefix = app.config.assetsPrefix || '/public/';
  const publicDir = app.config.assetsDir || path.join(app.appDir, 'app', 'public');
  if (ctx.path.startsWith(prefix) && ctx.method === 'GET') {
    const urlPath = ctx.path.substring(prefix.length);
    if (urlPath.endsWith('.css')) {
      ctx.type = 'text/css; charset=utf-8';
    } else if (urlPath.endsWith('.js')) {
      ctx.type = 'application/javascript; charset=utf-8';
    }

    const filePath = path.join(publicDir, urlPath);
    try {
      const fsStat = await stat(filePath);
      // ctx.headers.length = fsStat.size;
    } catch (ex) {
      ctx.status = 404;
      ctx.body = 'Not Found';
      return;
    }

    ctx.body = fs.createReadStream(filePath);
    return;
  }

  await next();
}