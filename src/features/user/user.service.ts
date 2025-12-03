import { UserRepository } from "./user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    return this.userRepository.findById(id);
  }

  async createUser(data: { email: string; password: string }) {
    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: { email?: string; password?: string }) {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }
}
