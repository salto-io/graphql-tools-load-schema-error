import gql from 'graphql-tag'

export default gql`
type PageInfo {
  endCursor: String
  startCursor: String
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
}

interface Edge {
  cursor: String!
}

interface Connection {
  edges: [Edge!]
  pageInfo: PageInfo!
  totalCount: Int
}
`
