import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserType {
  CUSTOMER = 'customer',
  CRUISER = 'cruiser',
}

@Entity("user")
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
    enum: UserType
  })
  type: UserType;
}
