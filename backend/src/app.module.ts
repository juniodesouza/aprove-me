import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthModule } from './health/health.module'
import { PayabledModule } from './payable/payable.module'
import { AssignorModule } from './assignor/assignor.module'
import { UserModule } from './user/user.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/infrastructure/guards/jwt-auth.guard'
import { AuthModule } from './auth/module'
import { PrismaModule } from './shared/prisma.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UserModule,
    PayabledModule,
    AssignorModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
