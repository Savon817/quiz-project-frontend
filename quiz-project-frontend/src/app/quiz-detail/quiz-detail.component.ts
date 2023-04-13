import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  quiz: any = null;
  creator: any = null;
  quizQuestion: any = [];

  constructor(private activatedRoute:ActivatedRoute, private quizService:QuizService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const quizId = params.id;
      this.quizService.fetchQuiz(quizId).subscribe({
        next: (res:any) => {
          this.quiz = res.payload.quiz;
          this.creator = res.payload.quiz.user;
          this.quizQuestion = res.payload.quiz.questions;
          console.log(this.quiz);
          console.log(this.quizQuestion.possible_answers);
        }
      });
    })
  }

}
