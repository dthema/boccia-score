import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('*.html')
  serveStaticPage(@Res() res: express.Response) {
    let file = 'index.html';
    if (res.req.url.endsWith('.html')) {
      const query = res.req.url.split('/');
      file = query[query.length - 1];
    }
    const pathToHtmlFile = join(__dirname, '..', './src/static', file);
    return res.sendFile(pathToHtmlFile);
  }
}
