import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module';
import { SharedModule } from './shared/shared.module';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
      PlayersModule,
      SharedModule,
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const dbUrl = configService.get<string>('DATABASE_URL');
          return {
            type: 'postgres',
            url: dbUrl,
            ssl: {rejectUnauthorized: false,},
            autoLoadEntities: true,
            synchronize: false,
          };
        },
    }),
      TournamentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}