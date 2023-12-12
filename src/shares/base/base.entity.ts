import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({name:'create_date'})
  createDate: Date;

  @UpdateDateColumn({name:'update_date'})
  updateDate: Date;
}
