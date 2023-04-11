import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  suggestedQuizzes: any = []
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.fetchQuiz().subscribe((res: any) =>{
      console.log(res);
      if(res.success){
        this.suggestedQuizzes = res.payload.suggested;
      }
    })
  }

}
