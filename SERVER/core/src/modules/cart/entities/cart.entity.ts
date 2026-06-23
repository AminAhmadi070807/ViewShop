import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'simple-json', onUpdate: 'CASCADE' })
  metadata: [
    {
      product: string;
      quantity: number;
      price: number;
    },
  ];

  @Column({ nullable: false, type: 'bigint', default: 0 })
  price: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
