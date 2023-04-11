import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  fetchQuiz(){
    return this.http.get('http://localhost:3000/api/v1/quizzes/home')
  }

}
