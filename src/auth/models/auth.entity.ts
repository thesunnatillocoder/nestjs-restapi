import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "src/upload-file/model/uploadfile.entity";
import { Course } from "src/course/model/course.entity";
import { UserCourse } from "src/user-course/model/usercourse.entity";


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

    @OneToMany(() => File, file => file.user)
    files: File[];

    @OneToMany(() => Course, course => course.user)
    courses: Course[];

    @OneToMany(() => UserCourse, userCourse => userCourse.user)
    userCourses: UserCourse[];
};