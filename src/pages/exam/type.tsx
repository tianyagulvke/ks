export interface Question {
  id: number;
  type: string; // 1:单选题 2:判断题 3:简答题
  title: string;
  choices?: string[];
}

export interface Answer {
  questionId: number;
  answer: string | number;
  typeId: number;
}

export interface Resolve {
  (value: string | number): void;
}
