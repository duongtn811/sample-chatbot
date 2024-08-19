"use client";

import { memo, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import directive from "remark-directive";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  content: string;
  className?: string;
};

function Answer({ content, className }: Props) {
  const syntaxRef = useRef<SyntaxHighlighter | null>(null);

  return (
    <div>
      <Markdown
        remarkPlugins={[directive, remarkGfm]}
        components={{
          table: ({ children, ...props }) => (
            <div>
              <table {...props}>{children}</table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead {...props}>{children}</thead>
          ),
          th: ({ children, ...props }) => <th {...props}>{children}</th>,
          td: ({ children, ...props }) => <td {...props}>{children}</td>,
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                ref={syntaxRef}
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dark}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}

export default memo(Answer);
