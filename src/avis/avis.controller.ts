import { Controller } from '@nestjs/common';
import { AvisService } from './avis.service';

@Controller('avis')
export class AvisController {
  constructor(private readonly avisService: AvisService) {}
}