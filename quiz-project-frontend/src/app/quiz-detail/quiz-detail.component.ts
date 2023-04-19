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

  // define quizForm as a FormGroup object
  quizForm = new FormGroup({})

  quiz: any = null;
  creator: any = null;
  quizQuestion: any = [];

  constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {


      // let questions: any = [
      //   {
      //     question: "This is a test",
      //     possible_answers: ["1", "2", "3", "4"]
      //   },
      //   {
      //     question: "This is a test",
      //     possible_answers: []
      //   },
      //   {
      //     question: "This is a test",
      //     possible_answers: []
      //   }
      // ]

      // let questionsFormControls: any = {};

      // questions.forEach((question, i) => {
      //   questionsFormControls[`questions${i}`] = new FormControl('What is this', Validators.required);
      // })


      // console.log("questionsformcontrols", questionsFormControls)
      // quizForm = new FormGroup({
      //   question0: new FormControl('', Validators.required),
      //   question1: new FormControl('', Validators.required),
      // })


      const quizId = params.id;
      this.quizService.fetchQuiz(quizId).subscribe({
        next: (res: any) => {
          this.quiz = res.payload.quiz;
          this.creator = res.payload.quiz.user;
          this.quizQuestion = res.payload.quiz.questions;
          console.log(res.payload.quiz.questions[0].possible_answers);

          // create a new FormGroup with an empty object
          this.quizForm = this.fb.group({})

          // iterate through each question in the quiz
          this.quizQuestion.forEach((question, i) => {
            // create a new FormControl for each question
            // set the initial value to an empty string
            // add the FormControl to the quizForm FormGroup object
            this.quizForm.addControl(`question${i}`, new FormControl('', Validators.required));
          })
          console.log("Quizform", this.quizForm)
        }
      });
    })
  }

  onSubmit() {
    const quizId = this.quiz.id;

    this.quizService.submitQuiz(quizId, this.quizForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
