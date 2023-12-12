import { BaseEntity } from "src/shares/base/base.entity";
import { Column, Entity, } from "typeorm";


@Entity('users')
export class UserEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    password: string;
}
