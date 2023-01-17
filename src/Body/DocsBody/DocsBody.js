import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import "./DocsBody.css";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={nightOwl}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const DocsBody = () => {
  const file_name = "BodyText.md";
  const [post, setPost] = useState("");

  useEffect(() => {
    import(`./${file_name}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPost(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{post}</ReactMarkdown> */}

      <ReactMarkdown rehypePlugins={[remarkGfm]} components={CodeBlock}>
        {post}
      </ReactMarkdown>
      {/* <ReactMarkdown children={CodeBlock('python', post)}> {post}</ReactMarkdown>  */}
    </div>
  );
};

export default DocsBody;
