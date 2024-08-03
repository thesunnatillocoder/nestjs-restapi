import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from 'typeorm';
import { Course } from 'src/course/model/course.entity';
import { File } from 'src/upload-file/model/uploadfile.entity';

@Entity()
export class CourseFile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    coursefilename: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Course, course => course.courseFiles, { onDelete: 'CASCADE' })
    course: Course;

    @ManyToOne(() => File, file => file.courseFiles, { onDelete: 'CASCADE' })
    file: File;
};
