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
  randomQuizzes: any = []

  constructor(private quizService:QuizService) { }


  ngOnInit(): void {
    
    this.quizService.fetchSuggestedQuiz().subscribe((res: any) =>{
      if(res.success){
        console.log(res);
        this.suggestedQuizzes = res.payload.suggested;
      }
    })
    this.quizService.fetchRandomQuiz().subscribe((res: any) =>{
      if(res.success){
        console.log(res);
        this.randomQuizzes = res.payload.random;
      }
    })
  }

}
