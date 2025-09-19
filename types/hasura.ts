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
  date: { input: string; output: string; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "cases" */
export type Cases = {
  __typename?: 'cases';
  case_type: Scalars['String']['output'];
  country: Scalars['String']['output'];
  created_at: Scalars['timestamptz']['output'];
  expected_completion_date: Scalars['date']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  process_status: Scalars['String']['output'];
  steps_completed: Scalars['Int']['output'];
  total_steps: Scalars['Int']['output'];
};

/** aggregated selection of "cases" */
export type Cases_Aggregate = {
  __typename?: 'cases_aggregate';
  aggregate?: Maybe<Cases_Aggregate_Fields>;
  nodes: Array<Cases>;
};

/** aggregate fields of "cases" */
export type Cases_Aggregate_Fields = {
  __typename?: 'cases_aggregate_fields';
  avg?: Maybe<Cases_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Cases_Max_Fields>;
  min?: Maybe<Cases_Min_Fields>;
  stddev?: Maybe<Cases_Stddev_Fields>;
  stddev_pop?: Maybe<Cases_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Cases_Stddev_Samp_Fields>;
  sum?: Maybe<Cases_Sum_Fields>;
  var_pop?: Maybe<Cases_Var_Pop_Fields>;
  var_samp?: Maybe<Cases_Var_Samp_Fields>;
  variance?: Maybe<Cases_Variance_Fields>;
};


/** aggregate fields of "cases" */
export type Cases_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Cases_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Cases_Avg_Fields = {
  __typename?: 'cases_avg_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "cases". All fields are combined with a logical 'AND'. */
export type Cases_Bool_Exp = {
  _and?: InputMaybe<Array<Cases_Bool_Exp>>;
  _not?: InputMaybe<Cases_Bool_Exp>;
  _or?: InputMaybe<Array<Cases_Bool_Exp>>;
  case_type?: InputMaybe<String_Comparison_Exp>;
  country?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expected_completion_date?: InputMaybe<Date_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  process_status?: InputMaybe<String_Comparison_Exp>;
  steps_completed?: InputMaybe<Int_Comparison_Exp>;
  total_steps?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "cases" */
export enum Cases_Constraint {
  /** unique or primary key constraint on columns "id" */
  CasesPkey = 'cases_pkey'
}

/** input type for incrementing numeric columns in table "cases" */
export type Cases_Inc_Input = {
  steps_completed?: InputMaybe<Scalars['Int']['input']>;
  total_steps?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "cases" */
export type Cases_Insert_Input = {
  case_type?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expected_completion_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  process_status?: InputMaybe<Scalars['String']['input']>;
  steps_completed?: InputMaybe<Scalars['Int']['input']>;
  total_steps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Cases_Max_Fields = {
  __typename?: 'cases_max_fields';
  case_type?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expected_completion_date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  process_status?: Maybe<Scalars['String']['output']>;
  steps_completed?: Maybe<Scalars['Int']['output']>;
  total_steps?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Cases_Min_Fields = {
  __typename?: 'cases_min_fields';
  case_type?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expected_completion_date?: Maybe<Scalars['date']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  process_status?: Maybe<Scalars['String']['output']>;
  steps_completed?: Maybe<Scalars['Int']['output']>;
  total_steps?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "cases" */
export type Cases_Mutation_Response = {
  __typename?: 'cases_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Cases>;
};

/** on_conflict condition type for table "cases" */
export type Cases_On_Conflict = {
  constraint: Cases_Constraint;
  update_columns?: Array<Cases_Update_Column>;
  where?: InputMaybe<Cases_Bool_Exp>;
};

/** Ordering options when selecting data from "cases". */
export type Cases_Order_By = {
  case_type?: InputMaybe<Order_By>;
  country?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expected_completion_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  process_status?: InputMaybe<Order_By>;
  steps_completed?: InputMaybe<Order_By>;
  total_steps?: InputMaybe<Order_By>;
};

/** primary key columns input for table: cases */
export type Cases_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "cases" */
export enum Cases_Select_Column {
  /** column name */
  CaseType = 'case_type',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpectedCompletionDate = 'expected_completion_date',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProcessStatus = 'process_status',
  /** column name */
  StepsCompleted = 'steps_completed',
  /** column name */
  TotalSteps = 'total_steps'
}

/** input type for updating data in table "cases" */
export type Cases_Set_Input = {
  case_type?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expected_completion_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  process_status?: InputMaybe<Scalars['String']['input']>;
  steps_completed?: InputMaybe<Scalars['Int']['input']>;
  total_steps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Cases_Stddev_Fields = {
  __typename?: 'cases_stddev_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Cases_Stddev_Pop_Fields = {
  __typename?: 'cases_stddev_pop_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Cases_Stddev_Samp_Fields = {
  __typename?: 'cases_stddev_samp_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "cases" */
export type Cases_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Cases_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Cases_Stream_Cursor_Value_Input = {
  case_type?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expected_completion_date?: InputMaybe<Scalars['date']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  process_status?: InputMaybe<Scalars['String']['input']>;
  steps_completed?: InputMaybe<Scalars['Int']['input']>;
  total_steps?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Cases_Sum_Fields = {
  __typename?: 'cases_sum_fields';
  steps_completed?: Maybe<Scalars['Int']['output']>;
  total_steps?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "cases" */
export enum Cases_Update_Column {
  /** column name */
  CaseType = 'case_type',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpectedCompletionDate = 'expected_completion_date',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProcessStatus = 'process_status',
  /** column name */
  StepsCompleted = 'steps_completed',
  /** column name */
  TotalSteps = 'total_steps'
}

export type Cases_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Cases_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Cases_Set_Input>;
  /** filter the rows which have to be updated */
  where: Cases_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Cases_Var_Pop_Fields = {
  __typename?: 'cases_var_pop_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Cases_Var_Samp_Fields = {
  __typename?: 'cases_var_samp_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Cases_Variance_Fields = {
  __typename?: 'cases_variance_fields';
  steps_completed?: Maybe<Scalars['Float']['output']>;
  total_steps?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "cases" */
  delete_cases?: Maybe<Cases_Mutation_Response>;
  /** delete single row from the table: "cases" */
  delete_cases_by_pk?: Maybe<Cases>;
  /** insert data into the table: "cases" */
  insert_cases?: Maybe<Cases_Mutation_Response>;
  /** insert a single row into the table: "cases" */
  insert_cases_one?: Maybe<Cases>;
  /** update data of the table: "cases" */
  update_cases?: Maybe<Cases_Mutation_Response>;
  /** update single row of the table: "cases" */
  update_cases_by_pk?: Maybe<Cases>;
  /** update multiples rows of table: "cases" */
  update_cases_many?: Maybe<Array<Maybe<Cases_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CasesArgs = {
  where: Cases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Cases_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_CasesArgs = {
  objects: Array<Cases_Insert_Input>;
  on_conflict?: InputMaybe<Cases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Cases_OneArgs = {
  object: Cases_Insert_Input;
  on_conflict?: InputMaybe<Cases_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CasesArgs = {
  _inc?: InputMaybe<Cases_Inc_Input>;
  _set?: InputMaybe<Cases_Set_Input>;
  where: Cases_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Cases_By_PkArgs = {
  _inc?: InputMaybe<Cases_Inc_Input>;
  _set?: InputMaybe<Cases_Set_Input>;
  pk_columns: Cases_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Cases_ManyArgs = {
  updates: Array<Cases_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "cases" */
  cases: Array<Cases>;
  /** fetch aggregated fields from the table: "cases" */
  cases_aggregate: Cases_Aggregate;
  /** fetch data from the table: "cases" using primary key columns */
  cases_by_pk?: Maybe<Cases>;
};


export type Query_RootCasesArgs = {
  distinct_on?: InputMaybe<Array<Cases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cases_Order_By>>;
  where?: InputMaybe<Cases_Bool_Exp>;
};


export type Query_RootCases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cases_Order_By>>;
  where?: InputMaybe<Cases_Bool_Exp>;
};


export type Query_RootCases_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "cases" */
  cases: Array<Cases>;
  /** fetch aggregated fields from the table: "cases" */
  cases_aggregate: Cases_Aggregate;
  /** fetch data from the table: "cases" using primary key columns */
  cases_by_pk?: Maybe<Cases>;
  /** fetch data from the table in a streaming manner: "cases" */
  cases_stream: Array<Cases>;
};


export type Subscription_RootCasesArgs = {
  distinct_on?: InputMaybe<Array<Cases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cases_Order_By>>;
  where?: InputMaybe<Cases_Bool_Exp>;
};


export type Subscription_RootCases_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Cases_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Cases_Order_By>>;
  where?: InputMaybe<Cases_Bool_Exp>;
};


export type Subscription_RootCases_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCases_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Cases_Stream_Cursor_Input>>;
  where?: InputMaybe<Cases_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};
