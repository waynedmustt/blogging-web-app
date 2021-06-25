import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class createUserRolesSeeding1624415626362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "roles"("name", "type") VALUES ('Public', 'public')`,
    );

    const role = await queryRunner.query(
      `SELECT * from "roles" WHERE "type" = 'public'`,
    );

    if (role && role.length > 0) {
      let hashedPassword;
      await bcrypt.hash('change_me', 10).then(function (hash) {
        hashedPassword = hash;
      });
      await queryRunner.query(`INSERT INTO "users"(
                  "firstName", "lastName", "username", "password",
                  "isActive", "roleId")
                  VALUES ('System', 'public', 'dimas', '${hashedPassword}', 
                  true, '${role[0].id}')
                  `);
    }
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
