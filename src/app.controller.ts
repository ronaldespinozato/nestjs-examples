import { Controller, Get, Logger, LoggerService, Inject, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiBearerAuth()
@ApiTags('healthy')
@Controller()
export class AppController {  
  logger = new Logger(AppController.name);
  constructor(    
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log("############### Testing log messages ###############")
    this.logger.error("Error on get Hello", new BadRequestException("Exception test healthy check").stack);
    this.logger.warn("Warning :)");
    this.logger.debug("Debug :)");
    this.logger.log("Info :_");
    this.logger.verbose("Verbose :)");
    return this.appService.getHello();
  }
}
