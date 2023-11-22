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

  public generateQuestion(): number {
    const generateRandomAnswer = () => Math.floor(Math.random() * 100);

    this.value1 = generateRandomAnswer();
    this.value2 = generateRandomAnswer();
    this.value3 = generateRandomAnswer();
    this.value4 = generateRandomAnswer();

    const selectedAnswer = Math.floor(Math.random() * 4);

    const generateQuestionForAnswer = (answer: number): void => {
      this.question1 = answer / 2;
      this.question2 = answer / 2;
    };

    let correctanswer: number;

    switch (selectedAnswer) {
      case 0:
        generateQuestionForAnswer(this.value1);
        correctanswer = this.value1;
        break;
      case 1:
        generateQuestionForAnswer(this.value2);
        correctanswer = this.value2;
        break;
      case 2:
        generateQuestionForAnswer(this.value3);
        correctanswer = this.value3;
        break;
      case 3:
        generateQuestionForAnswer(this.value4);
        correctanswer = this.value4;
        break;
      default:
        correctanswer = -1;
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
