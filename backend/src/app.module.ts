import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { PayabledModule } from './payable/payable.module'
import { AssignorModule } from './assignor/assignor.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PayabledModule,
    AssignorModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
