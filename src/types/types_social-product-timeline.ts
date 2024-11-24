export interface Author {
  name: string;
  avatar: string;
  isVerified: boolean;
}

export interface Product {
  name: string;
  description: string;
  price: number;
  rating: string;
  image: string;
}

export interface Post {
  id: number;
  author: Author;
  product: Product;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

export interface CommentProps {
  author: string;
  content: string;
  isAuthor: boolean;
}

export interface PostProps {
  post: Post;
}

