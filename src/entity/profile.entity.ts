import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => UserModel, (user) => user.profile)
  // @JoinColumn()
  user: UserModel;
  @Column()
  profileImg: string;
}
