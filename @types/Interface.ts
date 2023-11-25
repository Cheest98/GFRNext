interface TaskProps {
    id: string;
    task: string;
    description: string;
    status: string;
    createdAt: string;
    author: {
      name: string;
      image: string;
      id: string;
    };
  }