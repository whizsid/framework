import { Column, Entity, ID, CreatedAt } from '../Database';

export class TypetronMigrations extends Entity {

    @Column()
    id: ID;

    @Column()
    name: string;

    @Column()
    batch: number;

    @CreatedAt()
    time: Date;
}