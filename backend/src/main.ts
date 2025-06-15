import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { applyGlobalConfig } from './global-config'
import { setupSwagger } from './shared/infrastructure/docs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('integrations')

  setupSwagger(app)

  applyGlobalConfig(app)

  const configService = app.get(ConfigService)
  await app.listen(configService.get<number>('APP_PORT', 3000))
}
bootstrap()
