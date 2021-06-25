import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../../commons/filters/http-exception.filter';
import { RolesService } from './roles.service';

@Controller('roles')
@UseFilters(new HttpExceptionFilter())
export class RolesController {
  constructor(private _rolesService: RolesService) {}

  @Get('')
  getAll() {
    return this._rolesService.getAll();
  }
}
