export interface Animal {
  id: number;
  name: string;
  species: string;
  likes: { ownerOfLike: string }[];
  comments: { content: string }[];
}
