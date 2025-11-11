import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
  } from 'typeorm'
  import { Lesson } from './Lesson'
  import { QuizQuestion } from './QuizQuestion'
  
@Entity({ name: 'quizzes' })
export class Quiz {
  
    @PrimaryGeneratedColumn('increment')
    id: number
  
    @Column()
    title: string
  
    @Column()
    time_allowed: number
  
    @Column()
    total_score: number
  
    @Column()
    pass_score: number
  
    @Column({ type: 'text', nullable: true })
    instructions?: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    /* --------------------  RELATIONSHIPS  -------------------- */
  
    @ManyToOne(() => Lesson, (lesson) => lesson.quizzes)
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson
  
    @OneToMany(() => QuizQuestion, (question) => question.quiz)
    questions: QuizQuestion[]
}
  