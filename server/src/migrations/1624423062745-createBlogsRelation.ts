import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createBlogsRelation1624423062745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // USER ID FOREIGN KEY TO BLOGS
    await queryRunner.addColumn(
      'blogs',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      }),
    );

    await queryRunner.createForeignKey(
      'blogs',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // DELETE BLOGS FOREIGN KEYS
    const blogs = await queryRunner.getTable('blogs');
    const userBlogsFk = blogs.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('blogs', userBlogsFk);
    await queryRunner.dropColumn('blogs', 'userId');
  }
}
