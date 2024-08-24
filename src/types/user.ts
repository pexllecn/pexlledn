export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
  department: string;
  joinDate: string;
  status: string;
  lastActive: string;
}

export interface UserProfile extends User {
  location: string;
  phone: string;
  bio: string;
  items: number;
  followers: string;
  favoriteTags: string[];
  featuredListings: { name: string; image: string }[];
  itemFeed: { name: string; image: string; price: string }[];
}
