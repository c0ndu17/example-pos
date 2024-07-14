/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any; }
};

export type Bill = {
  __typename?: 'Bill';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  items?: Maybe<Array<MenuItem>>;
  restaurantTable?: Maybe<RestaurantTable>;
  restaurantTableId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  bills?: Maybe<Array<Bill>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  loginUser?: Maybe<User>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  bill?: Maybe<Bill>;
  bills?: Maybe<Array<Bill>>;
  menuItem?: Maybe<MenuItem>;
  menuItems?: Maybe<Array<MenuItem>>;
  restaurantTables?: Maybe<Array<RestaurantTable>>;
  restauratTable?: Maybe<RestaurantTable>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};


export type QueryBillArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMenuItemArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRestauratTableArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RestaurantTable = {
  __typename?: 'RestaurantTable';
  active?: Maybe<Scalars['Boolean']['output']>;
  bills?: Maybe<Array<Bill>>;
  id?: Maybe<Scalars['ID']['output']>;
  tableNo?: Maybe<Scalars['Int']['output']>;
};

export type User = {
  __typename?: 'User';
  authId?: Maybe<Scalars['ID']['output']>;
  bills?: Maybe<Array<Bill>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};
