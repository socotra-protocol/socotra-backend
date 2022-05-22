import { Controller, HttpStatus, Post, Body, Res, Get } from '@nestjs/common';
import { SubgraphService } from './subgraph.service';

@Controller('subgraph')
export class SubgraphController {
  constructor(private readonly subgraphService: SubgraphService) {}

  @Get()
  async readyYaml(@Res() res) {
    console.info('reading yaml');
    await this.subgraphService.readYaml();
    return res.status(200);
  }

  @Get('/write')
  async writeYaml(@Res() res) {
    console.info('writing yaml');
    await this.subgraphService.writeYaml();
    return res.status(200);
  }
}
