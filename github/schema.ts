import gql from 'graphql-tag'

export default gql`
scalar DateTime

extend type User @key(fields: "id") {
  id: ID! @external
  github: Github
}

type GithubInstallationEdge implements Edge {
  cursor: String!
  node: GithubInstallation!
}

type GithubInstallationConnection implements Connection {
  pageInfo: PageInfo!
  totalCount: Int
  edges: [GithubInstallationEdge!]
  nodes: [GithubInstallation!]
}

type Github {
  installations(
    after: String
    before: String
    first: Int
    last: Int
  ): GithubInstallationConnection!
  installation(id: ID!): GithubInstallation
  emails: [String!]!
  login: String!
}

enum RepoContent {
  EMPTY
  HAS_SALTO_CONFIG
  OTHER
}

enum GithubRepoOwnerType {
  USER
  ORGANIZATION
}

type GithubInstallation {
  id: ID!
  login: String!
  type: GithubRepoOwnerType!
  email: String
}

type Repo  {
  id: ID!
  name: String!
  diskUsage: Int
  updatedAt: DateTime!
  description: String
  hasPushPermissions: Boolean!
  content: RepoContent!
}

type RepoEdge implements Edge {
  cursor: String!
  node: Repo!
}

type RepoConnection implements Connection {
  pageInfo: PageInfo!
  totalCount: Int
  edges: [RepoEdge!]
  nodes: [Repo!]
}

extend type GithubInstallation  {
  repos(
    after: String
    before: String
    first: Int
    last: Int
  ): RepoConnection
}

extend type Mutation {
  githubOAuthRedirect(
    code: String!
    state: String
  ): Boolean # no return value

  setGithubInstallationEmail(id: ID!, email: String!): GithubInstallation!
}
`
