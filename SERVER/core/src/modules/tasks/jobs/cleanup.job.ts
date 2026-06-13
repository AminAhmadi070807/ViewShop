import { Injectable } from '@nestjs/common';
import { Auth } from '../../auth/entities/auth.entity';

@Injectable()
export class CleanupJob {
  cleanup(data: Auth[]) {
    for (const auth of data) {
      const checkDate = new Date(auth.createdAt);
      checkDate.setMonth(checkDate.getMonth() + 1);

      if (new Date() > checkDate)
        console.log('the Date is now after the auth data');
      else console.log('the Date is now before the auth data');
    }
  }
}
