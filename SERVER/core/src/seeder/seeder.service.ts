import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor() {}

  async onApplicationBootstrap() {}
}
