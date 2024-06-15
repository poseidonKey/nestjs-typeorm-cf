import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity()
export class UserModel {
  @PrimaryGeneratedColumn()
  // @PrimaryGeneratedColumn('uuid')
  // @PrimaryColumn()
  id: number;
  @Column()
  email: string;
  // @Column({
  //   type: 'varchar',
  //   name: 'title',
  //   length: 300,
  //   nullable: true,
  //   update: true,
  //   select: false,
  //   default: 'default value',
  //   unique: false, ///email 등에 사용
  // })
  // title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
    // default: Role.USER,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn()
  version: number;
  @Column()
  @Generated('uuid')
  additionalId: string;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    eager: false,
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileModel;
  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({ default: 0 })
  count: number;
}
