import gql from 'graphql-tag'

export default gql`
scalar DateTime

type User @key(fields: "id") {
  id: ID!
  name: String!
  firstName: String!
  lastName: String!
  email: String!
  orgMemberships(orgId: ID): [OrgMembership!]!
  intercomHash: String!
  avatarUrl: String
}

type OrgMembership @key(fields: "id") {
  id: ID!
  org: Org!
  user: User!
  role: OrgMembershipRole!
  createdAt: DateTime
}

type Org @key(fields: "id") {
  id: ID!
  name: String!
  createdAt: DateTime
  memberships: [OrgMembership!]
  invitations(
    status: InvitationStatus
    after: String
    before: String
    first: Int
    last: Int
  ): InvitationConnection
}

enum OrgMembershipRole {
  member
  admin
}

input UpdateOrgMembershipRoleInput {
  role: OrgMembershipRole!
}

type UpdateOrgMembershipRolePayload {
  membership: OrgMembership
}

extend type Query {
  me: User!
  org(id: ID!): Org
  orgInvitationStatus(
    token: String
  ): InvitationStatus
}

extend type Mutation {
  createOrg(
    name: String!
  ): Org!

  updateOrgMembershipRole(
    orgMembershipId: ID!,
    input: UpdateOrgMembershipRoleInput!
  ): UpdateOrgMembershipRolePayload

  deleteMembership(
    orgMembershipId: ID!
  ): OrgMembership

  acceptOrgInvitation(
    token: String!
    orgName: String!
  ): Org!

  requestDemo: Boolean
}

input CreateInvitationInput {
  role: OrgMembershipRole = member
  fullName: String!
  email: String!
}

input UpdateInvitationInput {
  role: OrgMembershipRole
  fullName: String
  email: String
}

enum InvitationStatus {
  pending
  accepted
  canceled
  expired
}

type Invitation @key(fields: "id") {
  id: ID!
  createdAt: DateTime!
  expiresAt: DateTime!
  token: String!
  status: InvitationStatus!
  email: String!
  fullName: String!
  role: OrgMembershipRole!
}

type InvitationEdge implements Edge {
  cursor: String!
  node: Invitation!
}

type InvitationConnection implements Connection {
  pageInfo: PageInfo!
  totalCount: Int
  edges: [InvitationEdge!]
  nodes: [Invitation!]
}

extend type Mutation {
  createInvitation(
    orgId: ID!
    input: [CreateInvitationInput!]!
  ): [Invitation!]!

  cancelInvitation(
    token: String!,
  ): Invitation!

  acceptInvitation(
    token: String!,
  ): OrgMembership!

  resendInvitation(
    token: String!,
  ): Invitation!

  updateInvitation(
    token: String!,
    input: UpdateInvitationInput!
  ): Invitation!

  deleteInvitation(
    token: String!,
  ): Invitation!

}





`
