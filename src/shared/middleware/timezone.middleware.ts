// timezone.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

@Injectable()
export class TimezoneMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the desired timezone for the application
    const desiredTimezone = 'Asia/Dubai'; // Replace with your preferred timezone
  
    // Set the timezone for Luxon globally
    const localDateTime = DateTime.local().setZone('America/New_York');
    console.log(localDateTime.zoneName, ' desiredTimezone');
    console.log(DateTime.local().zoneName, ' desiredTimezone');
    next();
  }
}
