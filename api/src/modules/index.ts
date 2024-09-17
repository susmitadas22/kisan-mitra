import { InventoryModule } from './inventory/inventory.module';
import { NearbyModule } from './nearby/nearby.module';
import { UploadsModule } from './uploads/uploads.module';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

export const MODULES = [
  UploadsModule,
  NearbyModule,
  InventoryModule,
  UserModule,
  WeatherModule,
];
