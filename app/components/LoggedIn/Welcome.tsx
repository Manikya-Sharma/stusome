type Props = {
  name: string;
};

export default function Welcome(props: Props) {
  return <section>Hello {props.name}!</section>;
}
