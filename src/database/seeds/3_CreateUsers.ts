import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';
import { User } from '@api/models/User';
import { RoleRepository } from '@base/api/repositories/Users/RoleRepository';
import { HashService } from '@base/infrastructure/services/hash/HashService';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const roleRepo = connection.getCustomRepository(RoleRepository);
    const userRepo = connection.getRepository(User);

    const adminRole = await roleRepo.findOne({ where: { name: 'Admin' } });
    const clientRole = await roleRepo.findOne({ where: { name: 'Client' } });

    if (!adminRole || !clientRole) {
      throw new Error('Roles not found. Make sure CreateRoles seeder has run first.');
    }
    const adminEmail = 'admin@example.com';

    const userExists = await userRepo.findOne({ where: { email: adminEmail } });
    if (userExists){
      console.log('User already seeded exists');
      return 
    }

    await connection.getRepository(User).save({
      email: adminEmail,
      password: 'admin123', 
      first_name: 'System',
      last_name: 'Admin',
      role: adminRole,
    });

    await connection.getRepository(User).save({
      email: 'client@example.com',
      password: 'client123', // hashed from model
      first_name: 'Client',
      last_name: 'User',
      role: clientRole,
    });
  }
}
