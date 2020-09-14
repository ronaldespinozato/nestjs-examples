import { Controller, Get, Logger, LoggerService, Inject, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {  
  logger = new Logger(AppController.name);
  constructor(    
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.error("Error on get Hello", new BadRequestException().stack);
    this.logger.warn("Warning :)");
    this.logger.debug("Debug :)");
    this.logger.log("Info :_");
    this.logger.verbose("Verbose :)");
    return this.appService.getHello();
  }
}
