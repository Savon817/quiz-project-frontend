import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  // createQuiz(){
  //   return this.http.post
  // }

  fetchSuggestedQuiz(){
    return this.http.get(`${URL}/quizzes/home`)
  }

  fetchRandomQuiz(){
    return this.http.get(`${URL}/quizzes/random`)
  }

  fetchQuiz(id:number){
    return this.http.get(`${URL}/quizzes/${id}`)
  }

  fetchQuizzes(){
    return this.http.get(`${URL}/quizzes`)
  }
  
//   submitQuiz(quizId: number, answers:any){
//     return this.http.post(`${URL}/quizzes/${quizId}/quiz_attempts`, answers)
//   }
}
