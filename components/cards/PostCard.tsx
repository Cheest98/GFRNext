interface PostCardProps {
  id: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
}

function PostCard({ id, content, author }: PostCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <h4 className="cursor-pointer text-base-semibold text-light-1">
              {author.name}
            </h4>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
