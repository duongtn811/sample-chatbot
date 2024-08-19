"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import directive from "remark-directive";
import { memo } from "react";

type Props = {
  content: string;
  className?: string;
};

function Answer({ content, className }: Props) {
  return (
    <div>
      <Markdown
        // className={cx(classes.root, className)}
        remarkPlugins={[directive, remarkGfm]}
        components={
          {
            table: ({ children, ...props }) => (
              <div >
                <table {...props}>
                  {children}
                </table>
              </div>
            ),
            thead: ({ children, ...props }) => (
              <thead {...props}>
                {children}
              </thead>
            ),
            th: ({ children, ...props }) => (
              <th {...props}>
                {children}
              </th>
            ),
            td: ({ children, ...props }) => (
              <td {...props}>
                {children}
              </td>
            ),
          }
        }
      >
        {content}
      </Markdown>
    </div>
  );
}

export default memo(Answer);
