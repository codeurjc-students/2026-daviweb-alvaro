import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

const MONGODB_PING_TIMEOUT_MS = 1500;

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly mongoose: MongooseHealthIndicator,
  ) {}

  // Readiness probe: returns 503 when MongoDB does not answer.
  @Get()
  @ApiOperation({ summary: 'Readiness probe' })
  @ApiServiceUnavailableResponse({ description: 'MongoDB is not reachable' })
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.mongoose.pingCheck('mongodb').withTimeout(MONGODB_PING_TIMEOUT_MS),
    ]);
  }
}
