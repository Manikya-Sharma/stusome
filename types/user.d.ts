export type State = {
  name: string;
  email: string;
  image: string;
  image_third_party: boolean;
};

export type Message = {
  senderEmail: string;
  receiverEmail: string;
  message: string;
  timeStamp: number;
};
