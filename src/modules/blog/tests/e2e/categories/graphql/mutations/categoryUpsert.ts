export const categoryUpsert = `
  mutation CategoryUpsert($id: ID, $title: String!) {
    categoryUpsert(id: $id, title: $title) {
      id
      title
      created_at
      updated_at
    }
  }
`
