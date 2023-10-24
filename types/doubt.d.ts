type DoubtReply = {
  id: string;
  author: string;
  content: string;
};
type DoubtAnswer = {
  id: string;
  content: string;
  author: string;
  replies: Array<DoubtReply>;
};

type Doubt = {
  id: string;
  title: string;
  author: string;
  content: string;
  answers: Array<DoubtAnswer>;
  tags: Array<string>;
};
