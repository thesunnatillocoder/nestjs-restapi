import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UsersEntity } from 'src/auth/models/auth.entity';
import { Course } from 'src/course/model/course.entity';

@Entity()
export class UserCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => UsersEntity, user => user.userCourses, { onDelete: 'CASCADE' })
    user: UsersEntity;

    @ManyToOne(() => Course, course => course.userCourses, { onDelete: 'CASCADE' })
    course: Course;
}
