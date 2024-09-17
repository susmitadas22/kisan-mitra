import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaService } from '@shared/database';
import { Public } from '@shared/decorators';

@ApiTags('app')
@Controller({
  path: '/',
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly prismaService: PrismaService,
  ) {}

  @ApiOperation({
    summary: 'Health check',
    description: 'Check the health of the application',
  })
  @Public()
  @HealthCheck()
  @Get('/health')
  public async getHealth() {
    return this.healthCheckService.check([() => this.prismaService.healthy()]);
  }
}
