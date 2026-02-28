import { Controller } from '@nestjs/common';
import { CampingService } from './camping.service';

@Controller('camping')
export class CampingController {
  constructor(private readonly campingService: CampingService) {}
}