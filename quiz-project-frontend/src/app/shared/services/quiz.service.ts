import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/auth.service';

const URL = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient, private authService:AuthService) { }

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

  submitQuiz(quizId: number, answers: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.value}`);
    const quizAttempt = {
      answers: {}
    };
    Object.keys(answers).forEach((key: string) => {
      quizAttempt.answers[key] = answers[key];
    });
    const body = { quiz_attempt: quizAttempt };
    return this.http.post<any>(`${URL}/quizzes/${quizId}/quiz_attempts`, body, { headers });
  }

}
