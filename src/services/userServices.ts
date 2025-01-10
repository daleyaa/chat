import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);

export async function findUserByUsername(username: string) {
  const user = await userRepository.findOne({
    select: {
      id: true,
      password: true,
      firstName: true,
      lastName: true,
      username: true,
      age: true,
    },
    where: {
      username: username,
    },
  });
  return user;
}

export async function findUserById(id: string) {
  return await userRepository.findOneBy({
    id: Number(id),
  });
}

export async function createUser(
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  age: number,
) {
  const user = userRepository.create({
    firstName,
    lastName,
    username,
    password,
    age,
  });
  return await userRepository.save(user);
}

export async function generateHash(password: string) {
  const saltHash = process.env.SALT_HASH || 12;
  return await bcrypt.hash(password, Number(saltHash));
}

export async function verifyHash(
  passwordEntered: string,
  userPassword: string,
) {
  return await bcrypt.compare(passwordEntered, userPassword);
}

export async function getAllUsers(offset: number, limit: number) {
  const users = await userRepository.find({
    take: limit,
    skip: offset,
  });
  return users;
}

export async function deleteUser(id: string) {
  return await userRepository.delete(id);
}

type UserType = {
  firstName?: string;
  lastName?: string;
  username?: string;
  age?: number;
};
export async function updateUser(user: User, ...props: UserType[]) {
  if (props[0].firstName) {
    user.firstName = props[0].firstName;
  }
  if (props[0].lastName) {
    user.lastName = props[0].lastName;
  }
  if (props[0].username) {
    user.username = props[0].username;
  }
  if (props[0].age) {
    user.age = props[0].age;
  }
  return await userRepository.save(user);
}

export async function userChats(userId: number) {
  const users = await userRepository.find({
    relations: {
      chats: true,
      ownerChats: true,
    },
    where: {
      id: userId,
    },
  });
  return users;
}
