"use client";

type Props = {
  content: string;
  className?: string;
};

function Question({ content, className }: Props) {
  return (
    <div className="flex justify-end">
        <div className="bg-gray-100 w-fit dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-lg">
        {content}
        </div>
    </div>
  );
}

export default Question;
