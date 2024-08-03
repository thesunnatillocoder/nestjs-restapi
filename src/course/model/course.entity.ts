import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UsersEntity } from 'src/auth/models/auth.entity';
import { CourseFile } from 'src/course-file/model/coursefile.entity';
import { UserCourse } from 'src/user-course/model/usercourse.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UsersEntity, user => user.courses, { onDelete: 'CASCADE' })
    user: UsersEntity;

    @OneToMany(() => CourseFile, courseFile => courseFile.course)
    courseFiles: CourseFile[];

    @OneToMany(() => UserCourse, userCourse => userCourse.course)
    userCourses: UserCourse[];
};
