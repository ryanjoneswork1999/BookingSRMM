import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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

export type BookingResponse = {
  __typename?: 'BookingResponse';
  errors?: Maybe<Array<FieldErrors>>;
  bookingk?: Maybe<Booking>;
};

export type BookingStatus = {
  __typename?: 'BookingStatus';
  id: Scalars['Float'];
  status: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrors = {
  __typename?: 'FieldErrors';
  field: Scalars['String'];
  message: Scalars['String'];
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

export type PostInput = {
  name: Scalars['String'];
  text: Scalars['String'];
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
  isitbooked: Array<Scalars['String']>;
  isBooked: Array<Booking>;
  listSpecificBookings: Array<UserHasBooking>;
  listUserBookings: Array<UserHasBooking>;
  listBookings: Array<Booking>;
  listBookingsByDate: Array<Booking>;
  datebookings: Array<Scalars['String']>;
  AdminScreen: Array<Array<Scalars['String']>>;
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


export type QueryIsitbookedArgs = {
  RequestedOn: Scalars['String'];
  sportpitchid: Scalars['Int'];
};


export type QueryIsBookedArgs = {
  request: Scalars['String'];
};


export type QueryListBookingsByDateArgs = {
  Date: Scalars['String'];
};


export type QueryDatebookingsArgs = {
  RequestedOn: Scalars['String'];
  sportpitchid: Scalars['Int'];
};


export type QueryAdminScreenArgs = {
  RequestedOn: Scalars['String'];
};

export type SportInput = {
  name: Scalars['String'];
  pricePerHour: Scalars['Float'];
  StartTime: Scalars['String'];
  EndTime: Scalars['String'];
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

export type StatusInput = {
  status: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserHasBooking = {
  __typename?: 'UserHasBooking';
  bookingid: Scalars['Float'];
  booking: Booking;
  user: User;
};

export type UserNamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
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

export type AdminScreenQueryVariables = Exact<{
  RequestedOn: Scalars['String'];
}>;


export type AdminScreenQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'AdminScreen'>
);

export type DatebookingsQueryVariables = Exact<{
  sportpitchid: Scalars['Int'];
  RequestedOn: Scalars['String'];
}>;


export type DatebookingsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'datebookings'>
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

export type IsitbookedQueryVariables = Exact<{
  sportpitchid: Scalars['Int'];
  RequestedOn: Scalars['String'];
}>;


export type IsitbookedQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isitbooked'>
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
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
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
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      booking: // value for 'booking'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
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
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserNamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AdminScreenDocument = gql`
    query AdminScreen($RequestedOn: String!) {
  AdminScreen(RequestedOn: $RequestedOn)
}
    `;

/**
 * __useAdminScreenQuery__
 *
 * To run a query within a React component, call `useAdminScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminScreenQuery({
 *   variables: {
 *      RequestedOn: // value for 'RequestedOn'
 *   },
 * });
 */
export function useAdminScreenQuery(baseOptions: Apollo.QueryHookOptions<AdminScreenQuery, AdminScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminScreenQuery, AdminScreenQueryVariables>(AdminScreenDocument, options);
      }
export function useAdminScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminScreenQuery, AdminScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminScreenQuery, AdminScreenQueryVariables>(AdminScreenDocument, options);
        }
export type AdminScreenQueryHookResult = ReturnType<typeof useAdminScreenQuery>;
export type AdminScreenLazyQueryHookResult = ReturnType<typeof useAdminScreenLazyQuery>;
export type AdminScreenQueryResult = Apollo.QueryResult<AdminScreenQuery, AdminScreenQueryVariables>;
export const DatebookingsDocument = gql`
    query datebookings($sportpitchid: Int!, $RequestedOn: String!) {
  datebookings(sportpitchid: $sportpitchid, RequestedOn: $RequestedOn)
}
    `;

/**
 * __useDatebookingsQuery__
 *
 * To run a query within a React component, call `useDatebookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatebookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatebookingsQuery({
 *   variables: {
 *      sportpitchid: // value for 'sportpitchid'
 *      RequestedOn: // value for 'RequestedOn'
 *   },
 * });
 */
export function useDatebookingsQuery(baseOptions: Apollo.QueryHookOptions<DatebookingsQuery, DatebookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DatebookingsQuery, DatebookingsQueryVariables>(DatebookingsDocument, options);
      }
export function useDatebookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DatebookingsQuery, DatebookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DatebookingsQuery, DatebookingsQueryVariables>(DatebookingsDocument, options);
        }
export type DatebookingsQueryHookResult = ReturnType<typeof useDatebookingsQuery>;
export type DatebookingsLazyQueryHookResult = ReturnType<typeof useDatebookingsLazyQuery>;
export type DatebookingsQueryResult = Apollo.QueryResult<DatebookingsQuery, DatebookingsQueryVariables>;
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

/**
 * __useIsBookedBoolNewQuery__
 *
 * To run a query within a React component, call `useIsBookedBoolNewQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsBookedBoolNewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsBookedBoolNewQuery({
 *   variables: {
 *      StartTime: // value for 'StartTime'
 *      EndTime: // value for 'EndTime'
 *      sportpitchid: // value for 'sportpitchid'
 *      RequestedOn: // value for 'RequestedOn'
 *   },
 * });
 */
export function useIsBookedBoolNewQuery(baseOptions: Apollo.QueryHookOptions<IsBookedBoolNewQuery, IsBookedBoolNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsBookedBoolNewQuery, IsBookedBoolNewQueryVariables>(IsBookedBoolNewDocument, options);
      }
export function useIsBookedBoolNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsBookedBoolNewQuery, IsBookedBoolNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsBookedBoolNewQuery, IsBookedBoolNewQueryVariables>(IsBookedBoolNewDocument, options);
        }
export type IsBookedBoolNewQueryHookResult = ReturnType<typeof useIsBookedBoolNewQuery>;
export type IsBookedBoolNewLazyQueryHookResult = ReturnType<typeof useIsBookedBoolNewLazyQuery>;
export type IsBookedBoolNewQueryResult = Apollo.QueryResult<IsBookedBoolNewQuery, IsBookedBoolNewQueryVariables>;
export const IsitbookedDocument = gql`
    query isitbooked($sportpitchid: Int!, $RequestedOn: String!) {
  isitbooked(sportpitchid: $sportpitchid, RequestedOn: $RequestedOn)
}
    `;

/**
 * __useIsitbookedQuery__
 *
 * To run a query within a React component, call `useIsitbookedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsitbookedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsitbookedQuery({
 *   variables: {
 *      sportpitchid: // value for 'sportpitchid'
 *      RequestedOn: // value for 'RequestedOn'
 *   },
 * });
 */
export function useIsitbookedQuery(baseOptions: Apollo.QueryHookOptions<IsitbookedQuery, IsitbookedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsitbookedQuery, IsitbookedQueryVariables>(IsitbookedDocument, options);
      }
export function useIsitbookedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsitbookedQuery, IsitbookedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsitbookedQuery, IsitbookedQueryVariables>(IsitbookedDocument, options);
        }
export type IsitbookedQueryHookResult = ReturnType<typeof useIsitbookedQuery>;
export type IsitbookedLazyQueryHookResult = ReturnType<typeof useIsitbookedLazyQuery>;
export type IsitbookedQueryResult = Apollo.QueryResult<IsitbookedQuery, IsitbookedQueryVariables>;
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

/**
 * __useListSpecificBookingsQuery__
 *
 * To run a query within a React component, call `useListSpecificBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSpecificBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSpecificBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListSpecificBookingsQuery(baseOptions?: Apollo.QueryHookOptions<ListSpecificBookingsQuery, ListSpecificBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSpecificBookingsQuery, ListSpecificBookingsQueryVariables>(ListSpecificBookingsDocument, options);
      }
export function useListSpecificBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSpecificBookingsQuery, ListSpecificBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSpecificBookingsQuery, ListSpecificBookingsQueryVariables>(ListSpecificBookingsDocument, options);
        }
export type ListSpecificBookingsQueryHookResult = ReturnType<typeof useListSpecificBookingsQuery>;
export type ListSpecificBookingsLazyQueryHookResult = ReturnType<typeof useListSpecificBookingsLazyQuery>;
export type ListSpecificBookingsQueryResult = Apollo.QueryResult<ListSpecificBookingsQuery, ListSpecificBookingsQueryVariables>;
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

/**
 * __useListPitchesQuery__
 *
 * To run a query within a React component, call `useListPitchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPitchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPitchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListPitchesQuery(baseOptions?: Apollo.QueryHookOptions<ListPitchesQuery, ListPitchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPitchesQuery, ListPitchesQueryVariables>(ListPitchesDocument, options);
      }
export function useListPitchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPitchesQuery, ListPitchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPitchesQuery, ListPitchesQueryVariables>(ListPitchesDocument, options);
        }
export type ListPitchesQueryHookResult = ReturnType<typeof useListPitchesQuery>;
export type ListPitchesLazyQueryHookResult = ReturnType<typeof useListPitchesLazyQuery>;
export type ListPitchesQueryResult = Apollo.QueryResult<ListPitchesQuery, ListPitchesQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
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

/**
 * __useSearchPitchQuery__
 *
 * To run a query within a React component, call `useSearchPitchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPitchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPitchQuery({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useSearchPitchQuery(baseOptions: Apollo.QueryHookOptions<SearchPitchQuery, SearchPitchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPitchQuery, SearchPitchQueryVariables>(SearchPitchDocument, options);
      }
export function useSearchPitchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPitchQuery, SearchPitchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPitchQuery, SearchPitchQueryVariables>(SearchPitchDocument, options);
        }
export type SearchPitchQueryHookResult = ReturnType<typeof useSearchPitchQuery>;
export type SearchPitchLazyQueryHookResult = ReturnType<typeof useSearchPitchLazyQuery>;
export type SearchPitchQueryResult = Apollo.QueryResult<SearchPitchQuery, SearchPitchQueryVariables>;
export const TotalOpenDocument = gql`
    query totalOpen($ID: Int!) {
  totalOpen(ID: $ID)
}
    `;

/**
 * __useTotalOpenQuery__
 *
 * To run a query within a React component, call `useTotalOpenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTotalOpenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTotalOpenQuery({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useTotalOpenQuery(baseOptions: Apollo.QueryHookOptions<TotalOpenQuery, TotalOpenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TotalOpenQuery, TotalOpenQueryVariables>(TotalOpenDocument, options);
      }
export function useTotalOpenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TotalOpenQuery, TotalOpenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TotalOpenQuery, TotalOpenQueryVariables>(TotalOpenDocument, options);
        }
export type TotalOpenQueryHookResult = ReturnType<typeof useTotalOpenQuery>;
export type TotalOpenLazyQueryHookResult = ReturnType<typeof useTotalOpenLazyQuery>;
export type TotalOpenQueryResult = Apollo.QueryResult<TotalOpenQuery, TotalOpenQueryVariables>;