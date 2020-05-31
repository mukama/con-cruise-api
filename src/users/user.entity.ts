import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserType {
  CUSTOMER = 'customer',
  CRUISER = 'cruiser',
}

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name?: string

  @Column()
  latitude?: number

  @Column()
  longitude?: number

  @Column({ default: 0 })
  rides: number

  @Column()
  rating?: number

  @Column({
    type: 'simple-enum',
    default: UserType.CUSTOMER,
    enum: UserType
  })
  type: UserType;
}
