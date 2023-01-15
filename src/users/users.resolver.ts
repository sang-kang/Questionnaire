import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(returns => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(returns => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Query(returns => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Mutation(returns => User)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(returns => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}