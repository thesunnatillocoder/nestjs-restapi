import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createAt: Date;

    @Column({unique: true})
    email: string;

    @Column()
    hash: string;

    @Column({ default: '' })
    fullname: string;

    @Column()
    isadmin: boolean;
}