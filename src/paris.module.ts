import { Module } from '@nestjs/common';
import { ParisController } from './paris.controller';
import { ParisService } from './paris.service';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
      })
  ],
  controllers: [ParisController],
  providers: [ParisService],
})
export class ParisModule {}
