import { Prisma } from "generated/prisma/client";
import { PermissionRepository } from "./permission.repository";

export class PermissionService {
  private permissionRepository: PermissionRepository;
  constructor() {
    this.permissionRepository = new PermissionRepository();
  }

  async getAllPermissions() {
    return this.permissionRepository.findAll();
  }

  async getPermissionById(id: string) {
    return this.permissionRepository.findById(id);
  }

  async getPermissionByCode(code: string) {
    return this.permissionRepository.findByCode(code);
  }

  async createPermission(data: Prisma.PermissionCreateInput) {
    return this.permissionRepository.create(data);
  }

  async updatePermission(id: string, data: Prisma.PermissionUpdateInput) {
    return this.permissionRepository.update(id, data);
  }

  async deletePermission(id: string) {
    return this.permissionRepository.delete(id);
  }
}

