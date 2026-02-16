import { Prisma } from "generated/prisma/client";
import { RoleRepository } from "./role.repository";

export class RoleService {
  private roleRepository: RoleRepository;
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async getAllRoles() {
    return this.roleRepository.findAll();
  }

  async getRoleById(id: string) {
    return this.roleRepository.findById(id);
  }

  async getRoleByCode(code: string) {
    return this.roleRepository.findByCode(code);
  }

  async createRole(data: Prisma.RoleCreateInput) {
    return this.roleRepository.create(data);
  }

  async updateRole(id: string, data: Prisma.RoleUpdateInput) {
    return this.roleRepository.update(id, data);
  }

  async deleteRole(id: string) {
    return this.roleRepository.delete(id);
  }
}

