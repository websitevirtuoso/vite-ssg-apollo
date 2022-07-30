export interface Category {
  id: string
  title: string
}

export interface PostInput {
  title: string
  slug: string
  status: string
  content: string
  category_id: number
  meta_title: string
  meta_keyword: string
  meta_description: string
}

export interface Post extends PostInput {
  id: string
  category: Category
}
