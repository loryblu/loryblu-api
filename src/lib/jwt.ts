import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export default JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('SECRET_JWT'),
    global: true,
  }),
});
