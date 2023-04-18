import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../shared/services/quiz.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {

  quizForm = new FormGroup({
    
  })

  // quizForm = this.fb.group({
  //   answer: ['']
  // })

  quiz: any = null;
  creator: any = null;
  quizQuestion: any = [];
  possible_answers: any;

  constructor(private activatedRoute:ActivatedRoute, private quizService:QuizService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const quizId = params.id;
      this.quizService.fetchQuiz(quizId).subscribe({
        next: (res:any) => {
          this.quiz = res.payload.quiz;
          this.creator = res.payload.quiz.user;
          this.quizQuestion = res.payload.quiz.questions;
          console.log(res.payload.quiz.questions[0].possible_answers);
          
        }
      });
    })
  }

  onSubmit(){
    console.log(this.quizForm.value);
  }

}
