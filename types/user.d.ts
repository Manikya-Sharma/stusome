export type State = {
  name: string;
  email: string;
  picture: string;
};

export type Message = {
  senderId: string;
  receiverId: string;
  message: string;
  timeStamp: number;
};
