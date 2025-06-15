import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { PayabledModule } from './payable/payable.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PayabledModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
