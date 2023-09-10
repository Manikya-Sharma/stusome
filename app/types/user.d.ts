export type State = {
  _id: string;
  name: string;
  email: string;
  password: string;
  picture: string;
  hasPic: boolean;
};

export type Message = {
  senderId: string;
  receiverId: string;
  message: string;
  timeStamp: number;
};
