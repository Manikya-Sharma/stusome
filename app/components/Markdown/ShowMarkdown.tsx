import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Props = {
  data: string;
};

export default function ShowMarkdown(props: Props) {
  let currentId = 0;
  const generateId = () => {
    currentId += 1;
    return currentId;
  };
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              style={materialOceanic}
              language={match[1]}
              preTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
        h1({ node, ...props }) {
          return (
            <h2
              className="hover:underline underline-offset-1 cursor-pointer hover:after:content-['\00A7'] after:ml-2 after:text-slate-300"
              id={generateId().toString()}
              {...props}
            ></h2>
          );
        },
        h2: "h3",
        h3: "h4",
      }}
    >
      {props.data}
    </ReactMarkdown>
  );
}
