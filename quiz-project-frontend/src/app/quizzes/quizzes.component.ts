import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  quizzes: any = []

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.fetchQuizzes().subscribe((res:any) => {
      if(res.success)
      console.log(res);
      this.quizzes = res.payload
    })
  }

}
