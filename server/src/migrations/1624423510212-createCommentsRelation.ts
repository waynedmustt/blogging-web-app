import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createCommentsRelation1624423510212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // USER ID FOREIGN KEY TO COMMENTS
    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // BLOG ID FOREIGN KEY TO COMMENTS
    await queryRunner.addColumn(
      'comments',
      new TableColumn({
        name: 'blogId',
        type: 'uuid',
        generationStrategy: 'uuid',
        default: `uuid_generate_v4()`,
      }),
    );

    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        columnNames: ['blogId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'blogs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // DELETE COMMENTS FOREIGN KEYS
    const blogs = await queryRunner.getTable('comments');
    const userCommentsFk = blogs.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('comments', userCommentsFk);
    await queryRunner.dropColumn('comments', 'userId');

    const blogCommentsFk = blogs.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('blogId') !== -1,
    );
    await queryRunner.dropForeignKey('comments', blogCommentsFk);
    await queryRunner.dropColumn('comments', 'blogId');
  }
}
