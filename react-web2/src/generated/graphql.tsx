import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  posts: Array<Post>;
  post?: Maybe<Post>;
  me?: Maybe<User>;
  listPitches: Array<SportPitch>;
  totalOpen: Scalars['Int'];
  searchPitch: SportPitch;
  isBookedBoolNew: Scalars['Boolean'];
  isBooked: Array<Booking>;
  listSpecificBookings: Array<UserHasBooking>;
  listUserBookings: Array<UserHasBooking>;
  listBookings: Array<Booking>;
  listBookingsByDate: Array<Booking>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryTotalOpenArgs = {
  ID: Scalars['Int'];
};


export type QuerySearchPitchArgs = {
  ID: Scalars['Int'];
};


export type QueryIsBookedBoolNewArgs = {
  RequestedOn: Scalars['String'];
  sportpitchid: Scalars['Int'];
  EndTime: Scalars['String'];
  StartTime: Scalars['String'];
};


export type QueryIsBookedArgs = {
  request: Scalars['String'];
};


export type QueryListBookingsByDateArgs = {
  Date: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  text: Scalars['String'];
  points: Scalars['Float'];
  creatorId: Scalars['Float'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type SportPitch = {
  __typename?: 'SportPitch';
  id: Scalars['Float'];
  name: Scalars['String'];
  pricePerHour: Scalars['Float'];
  StartTime: Scalars['String'];
  EndTime: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  RequestedOn: Scalars['String'];
  StartTime: Scalars['String'];
  EndTime: Scalars['String'];
  sportpitchid: Scalars['Float'];
  statusid: Scalars['Float'];
  sportPitchi: SportPitch;
  bookingStatus: BookingStatus;
};

export type BookingStatus = {
  __typename?: 'BookingStatus';
  id: Scalars['Float'];
  status: Scalars['String'];
};

export type UserHasBooking = {
  __typename?: 'UserHasBooking';
  bookingid: Scalars['Float'];
  booking: Booking;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createSportPitch: SportPitch;
  createBookingStatus: BookingStatus;
  createBookingUser: UserHasBooking;
  createBookingNew: BookingResponse;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  name?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserNamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationCreateSportPitchArgs = {
  sportInput: SportInput;
};


export type MutationCreateBookingStatusArgs = {
  bookingStatus: StatusInput;
};


export type MutationCreateBookingUserArgs = {
  bookingId: Scalars['Int'];
};


export type MutationCreateBookingNewArgs = {
  booking: BookingInput;
};

export type PostInput = {
  name: Scalars['String'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserNamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type SportInput = {
  name: Scalars['String'];
  pricePerHour: Scalars['Float'];
  StartTime: Scalars['String'];
  EndTime: Scalars['String'];
};

export type StatusInput = {
  status: Scalars['String'];
};

export type BookingResponse = {
  __typename?: 'BookingResponse';
  errors?: Maybe<Array<FieldErrors>>;
  bookingk?: Maybe<Booking>;
};

export type FieldErrors = {
  __typename?: 'FieldErrors';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type BookingInput = {
  RequestedOn: Scalars['String'];
  StartTime: Scalars['String'];
  EndTime: Scalars['String'];
  sportpitchid: Scalars['Float'];
  statusid: Scalars['Float'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateBookingMutationVariables = Exact<{
  booking: BookingInput;
}>;


export type CreateBookingMutation = (
  { __typename?: 'Mutation' }
  & { createBookingNew: (
    { __typename?: 'BookingResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrors' }
      & Pick<FieldErrors, 'field' | 'message'>
    )>>, bookingk?: Maybe<(
      { __typename?: 'Booking' }
      & Pick<Booking, 'id' | 'RequestedOn' | 'StartTime' | 'EndTime'>
      & { sportPitchi: (
        { __typename?: 'SportPitch' }
        & Pick<SportPitch, 'name' | 'pricePerHour'>
      ), bookingStatus: (
        { __typename?: 'BookingStatus' }
        & Pick<BookingStatus, 'id' | 'status'>
      ) }
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'text' | 'points' | 'creatorId'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UserNamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type IsBookedBoolNewQueryVariables = Exact<{
  StartTime: Scalars['String'];
  EndTime: Scalars['String'];
  sportpitchid: Scalars['Int'];
  RequestedOn: Scalars['String'];
}>;


export type IsBookedBoolNewQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isBookedBoolNew'>
);

export type ListSpecificBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSpecificBookingsQuery = (
  { __typename?: 'Query' }
  & { listSpecificBookings: Array<(
    { __typename?: 'UserHasBooking' }
    & { booking: (
      { __typename?: 'Booking' }
      & Pick<Booking, 'id' | 'RequestedOn' | 'StartTime' | 'EndTime'>
      & { sportPitchi: (
        { __typename?: 'SportPitch' }
        & Pick<SportPitch, 'name'>
      ) }
    ), user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type ListPitchesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListPitchesQuery = (
  { __typename?: 'Query' }
  & { listPitches: Array<(
    { __typename?: 'SportPitch' }
    & Pick<SportPitch, 'id' | 'name' | 'pricePerHour' | 'StartTime' | 'EndTime'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'textSnippet'>
  )> }
);

export type SearchPitchQueryVariables = Exact<{
  ID: Scalars['Int'];
}>;


export type SearchPitchQuery = (
  { __typename?: 'Query' }
  & { searchPitch: (
    { __typename?: 'SportPitch' }
    & Pick<SportPitch, 'name' | 'StartTime' | 'EndTime' | 'pricePerHour'>
  ) }
);

export type TotalOpenQueryVariables = Exact<{
  ID: Scalars['Int'];
}>;


export type TotalOpenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'totalOpen'>
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateBookingDocument = gql`
    mutation createBooking($booking: bookingInput!) {
  createBookingNew(booking: $booking) {
    errors {
      field
      message
    }
    bookingk {
      id
      RequestedOn
      StartTime
      EndTime
      sportPitchi {
        name
        pricePerHour
      }
      bookingStatus {
        id
        status
      }
    }
  }
}
    `;

export function useCreateBookingMutation() {
  return Urql.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    createdAt
    updatedAt
    name
    text
    points
    creatorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UserNamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const IsBookedBoolNewDocument = gql`
    query isBookedBoolNew($StartTime: String!, $EndTime: String!, $sportpitchid: Int!, $RequestedOn: String!) {
  isBookedBoolNew(
    StartTime: $StartTime
    EndTime: $EndTime
    sportpitchid: $sportpitchid
    RequestedOn: $RequestedOn
  )
}
    `;

export function useIsBookedBoolNewQuery(options: Omit<Urql.UseQueryArgs<IsBookedBoolNewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsBookedBoolNewQuery>({ query: IsBookedBoolNewDocument, ...options });
};
export const ListSpecificBookingsDocument = gql`
    query listSpecificBookings {
  listSpecificBookings {
    booking {
      id
      RequestedOn
      StartTime
      EndTime
      sportPitchi {
        name
      }
    }
    user {
      id
      username
    }
  }
}
    `;

export function useListSpecificBookingsQuery(options: Omit<Urql.UseQueryArgs<ListSpecificBookingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListSpecificBookingsQuery>({ query: ListSpecificBookingsDocument, ...options });
};
export const ListPitchesDocument = gql`
    query listPitches {
  listPitches {
    id
    name
    pricePerHour
    StartTime
    EndTime
  }
}
    `;

export function useListPitchesQuery(options: Omit<Urql.UseQueryArgs<ListPitchesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ListPitchesQuery>({ query: ListPitchesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    id
    createdAt
    updatedAt
    name
    textSnippet
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const SearchPitchDocument = gql`
    query searchPitch($ID: Int!) {
  searchPitch(ID: $ID) {
    name
    StartTime
    EndTime
    pricePerHour
  }
}
    `;

export function useSearchPitchQuery(options: Omit<Urql.UseQueryArgs<SearchPitchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchPitchQuery>({ query: SearchPitchDocument, ...options });
};
export const TotalOpenDocument = gql`
    query totalOpen($ID: Int!) {
  totalOpen(ID: $ID)
}
    `;

export function useTotalOpenQuery(options: Omit<Urql.UseQueryArgs<TotalOpenQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TotalOpenQuery>({ query: TotalOpenDocument, ...options });
};