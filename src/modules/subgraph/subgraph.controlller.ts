import { Controller, HttpStatus, Post, Body, Res, Get } from '@nestjs/common';
import { SubgraphService } from './subgraph.service';

@Controller('subgraph')
export class SubgraphController {
  constructor(private readonly subgraphService: SubgraphService) {}

  @Get()
  async readyYaml() {
    console.info('reading yaml');

    return await this.subgraphService.readYaml();
  }

  @Get('/write')
  async writeYaml() {
    console.info('writing yaml');

    return await this.subgraphService.writeYaml();
  }

  @Get('/gen-and-deploy')
  async genAndDepoly() {
    console.info('deploying subgraph');

    return await this.subgraphService.deploySubgraph();
  }
}
