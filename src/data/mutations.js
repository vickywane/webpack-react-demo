import gql from 'graphql-tag';

const Group = gql`
  mutation Group($name: String) {
    createGroup(name: $name) {
      name
    }
  }
`;

const Organization = gql`
  mutation createOrganization(
    $name: String!
    $country: String
    $state: String
    $description: String
    $email: String
    $password: String
  ) {
    createOrganization(
      name: $name
      password: $password
      description: $description
      state: $state
      email: $email
      country: $country
    ) {
      name
    }
  }
`;

const Login = gql`
  mutation loginOrg($email: String!, $name: String!, $password: String!) {
    loginOrganization(
      where: { email: $email }
      name: $name
      password: $password
    ) {
      token
      organization {
        name
        password
      }
    }
  }
`;

export { Group, Organization, Login };
