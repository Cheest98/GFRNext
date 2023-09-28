type PostType = {
  picturePath?: string;
  content: string;
};

type FetchedPostType = PostType & {
  id: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
};

export type { PostType, FetchedPostType };
