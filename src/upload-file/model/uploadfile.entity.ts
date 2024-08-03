import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UsersEntity } from 'src/auth/models/auth.entity';
import { CourseFile } from 'src/course-file/model/coursefile.entity';

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @Column({ nullable: true })
    extension: string;

    @Column()
    filesize: number;

    @Column()
    path: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UsersEntity, user => user.files, { onDelete: 'CASCADE' })
    user: UsersEntity;

    @OneToMany(() => CourseFile, courseFile => courseFile.file)
    courseFiles: CourseFile[];
}
