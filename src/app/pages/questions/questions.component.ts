import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit{
  public selectedOption: string = "";
  public value1: number = 1;
  public value2: number = 1;
  public value3: number = 1;
  public value4: number = 1;
  public question1: number = 1;
  public question2: number = 1;
  public correctAnswer: number = 0;

  public ngOnInit() {
    this.correctAnswer = this.generateQuestion()
  }

  public generateQuestion(): number
  {
    let answer1 = Math.floor(Math.random() * 100);
    let answer2 = Math.floor(Math.random() * 100);
    let answer3 = Math.floor(Math.random() * 100);
    let answer4 = Math.floor(Math.random() * 100);
    this.value1 = answer1;
    this.value2 = answer2;
    this.value3 = answer3;
    this.value4 = answer4;

    let selectedAnswer = Math.floor(Math.random() * 4);
    let correctanswer;

    switch (selectedAnswer){
      case 0:
        this.question1 = this.value1 / 2;
        this.question2 = this.value1 / 2;
        correctanswer = this.value1;
        break;
      case 1:
        this.question1 = this.value2 / 2;
        this.question2 = this.value2 / 2;
        correctanswer = this.value2;
        break;
      case 2:
        this.question1 = this.value3 / 2;
        this.question2 = this.value3 / 2;
        correctanswer = this.value3;
        break;
      case 3:
        this.question1 = this.value4 / 2;
        this.question2 = this.value4 / 2;
        correctanswer = this.value4;
        break;
    }

    return correctanswer;
  }

  public answer()
  {
    if(this.selectedOption != this.correctAnswer.toString())
    {
      alert("Foute antwoord.")
    }
    else {
      window.localStorage.setItem("giveChest", "1");
      window.location.href = "dashboard";
    }

  }
}
