import { Component, OnInit, computed, input, output, signal } from '@angular/core';
import { POINTS_PER_CORRECT_ANSWER, WINNING_SCORE, pointsForAnswer, shuffle } from '../game-rules';
import { AnimalType, Statement } from '../models';

@Component({
  selector: 'app-game',
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {
  readonly animalType = input.required<AnimalType>();
  readonly statements = input.required<Statement[]>();
  readonly won = output<void>();
  readonly startOver = output<void>();

  protected readonly winningScore = WINNING_SCORE;
  protected readonly pointsPerCorrectAnswer = POINTS_PER_CORRECT_ANSWER;

  protected readonly queue = signal<Statement[]>([]);
  protected readonly currentIndex = signal(0);
  protected readonly score = signal(0);
  protected readonly lastAnswer = signal<boolean | null>(null);

  protected readonly currentStatement = computed(() => this.queue().at(this.currentIndex()));
  protected readonly isAnswered = computed(() => this.lastAnswer() !== null);
  protected readonly isAnswerCorrect = computed(() => this.lastAnswer() === this.currentStatement()?.isTrue);
  protected readonly hasWon = computed(() => this.score() >= WINNING_SCORE);
  protected readonly progressPercent = computed(() => Math.min(100, (this.score() / WINNING_SCORE) * 100));

  ngOnInit(): void {
    this.restart();
  }

  protected answer(answeredAsFact: boolean): void {
    const statement = this.currentStatement();
    if (!statement || this.isAnswered()) {
      return;
    }
    this.lastAnswer.set(answeredAsFact);
    this.score.update(score => score + pointsForAnswer(statement, answeredAsFact));
  }

  protected next(): void {
    if (this.hasWon()) {
      this.won.emit();
      return;
    }
    this.lastAnswer.set(null);
    this.currentIndex.update(index => index + 1);
  }

  protected restart(): void {
    this.queue.set(shuffle(this.statements()));
    this.currentIndex.set(0);
    this.score.set(0);
    this.lastAnswer.set(null);
  }
}
