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
  
  // Fills the home page with random selected quizzes
  fetchSuggestedQuiz(){
    return this.http.get(`${URL}/quizzes/home`)
  }

  // Fetches a random quiz to display on the featured part of the home page (subject to change)
  fetchRandomQuiz(){
    return this.http.get(`${URL}/quizzes/random`)
  }

  // Fetches a specific quiz by id 
  fetchQuiz(id:number){
    return this.http.get(`${URL}/quizzes/${id}`)
  }

  // Fetches all the quizzes that exist in the database
  fetchQuizzes(){
    return this.http.get(`${URL}/quizzes`)
  }

  submitQuiz(quizId: number, answers: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token.value}`);
    
    // Stores the user selected answer in an object
    const quizAttempt = {
      answers: {}
    };
    
    // Populates the quizAttempt object while looping the answers object
    Object.keys(answers).forEach((key: string) => {
      quizAttempt.answers[key] = answers[key];
    });
    
    const body = { quiz_attempt: quizAttempt };
    
    return this.http.post<any>(`${URL}/quizzes/${quizId}/quiz_attempts`, body, { headers });
  }

}
