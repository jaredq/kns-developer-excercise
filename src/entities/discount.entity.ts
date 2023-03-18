import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  product: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
