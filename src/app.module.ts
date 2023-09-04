import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MasterModule } from './master/master.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './config/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
@Module({
  imports: [ 
    AuthModule,
    MasterModule,
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './.env'
  }),
  EasyconfigModule.register({
    path: `./environment/.env.${process.env.NODE_ENV}`,
  }),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: 'JWT_SECRET',
    signOptions: {
      expiresIn: '1h'
    }
  }),
  DatabaseModule,
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      // tls: {
      //   ciphers: 'SSLv3',
      // },
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_ID, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
    },
    defaults: {
      from: 'SBH rprakashkgm@gmail.com', // outgoing email ID
    },
    template: {
      dir: process.cwd() + '/template/',
    //  adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
