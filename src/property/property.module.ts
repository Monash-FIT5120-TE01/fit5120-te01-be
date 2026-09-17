import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity.js';
import { PropertyObservation } from './entities/property-observation.entity.js';
import { PropertyBuildingLink } from './entities/property-building-link.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      PropertyObservation,
      PropertyBuildingLink,
    ]),
  ],
})
export class PropertyModule {}
