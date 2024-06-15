import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entity';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('sample')
  async sample() {
    // const user1 = this.userRepository.create({
    //   email: 'test@codefactory.ai',
    // });
    // const user2 = this.userRepository.save({
    //   email: 'jsy@jsy.com',
    // });
    // const user3 = await this.userRepository.preload({
    //   id: 101,
    //   email: 'kuk@jsy.com',
    // });
    // return user3;
    // await this.userRepository.increment(
    //   {
    //     id: 1,
    //   },
    //   'count',
    //   2,
    // );
    // const count = await this.userRepository.count({
    //   where: {
    //     email: ILike('%0%'),
    //   },
    // });
    // const sum = this.userRepository.sum('count', {
    //   email: ILike('%0%'),
    // });
    const userAndCount = this.userRepository.findAndCount({ take: 3 });

    return userAndCount;
  }

  @Get('/users')
  getUsers() {
    return this.userRepository.find({
      // relations: {
      //   profile: true,
      //   // posts: true,
      // },
      // select: {
      //   id: true,
      //   createdAt: true,
      //   version: true,
      //   profile: { id: true },
      // },
      where: {
        // id: Not(1),
        // id: 30,
        // email: Like('%0%'),
        // id: Between(5, 10),
      },
      order: {
        id: 'ASC',
      },
      // skip: 0,
      // take: 1,
    });
  }

  @Post('users')
  async postUser() {
    for (let i = 0; i < 100; i++) {
      await this.userRepository.save({
        email: `user-${i}@google.com`,
      });
    }
    // return this.userRepository.save({ email: 'abc@codefactory.ai' });
  }
  @Patch('users/:id')
  async patchUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id),
      },
    });
    return await this.userRepository.save({ ...user });
  }
  @Post('/user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
      profile: {
        profileImg: 'asdf.jpg',
      },
    });
    // await this.profileRepository.save({
    //   profileImg: 'asdf.jpg',
    //   user: user,
    // });
    return user;
  }
  @Post('/user/post')
  async createUserAndPost() {
    const user = await this.userRepository.save({
      email: 'postuser@codefactory.ai',
    });
    await this.postRepository.save({
      author: user,
      title: 'post1',
    });
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    });
    return user;
  }
  @Delete('/user/profile/:id')
  async deleteProfile(@Param('id') id: string) {
    await this.profileRepository.delete(+id);
  }
  @Post('/posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'Nestjs lecture',
    });
    const post2 = await this.postRepository.save({
      title: 'programming lecture',
    });
    const tag1 = await this.tagRepository.save({
      name: 'javascript',
      posts: [post1, post2],
    });
    const tag2 = await this.tagRepository.save({
      name: 'typescript',
      posts: [post1],
    });
    await this.postRepository.save({
      title: 'Nextjs lecture',
      tags: [tag1, tag2],
    });
    return true;
  }
  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      },
    });
  }
  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      },
    });
  }
}
