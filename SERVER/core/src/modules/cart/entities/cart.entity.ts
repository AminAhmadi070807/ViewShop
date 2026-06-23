import {
  Column,
  Entity,
  ObjectId,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: ObjectId;

  @Column({ nullable: false, type: 'simple-json', onUpdate: 'CASCADE' })
  metadata: [
    {
      product: ObjectId;
      quantity: number;
      price: number;
    },
  ];

  @Column({ nullable: false, type: 'bigint', default: 0 })
  price: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
