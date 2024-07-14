/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any };
};

export type Bill = {
  __typename?: "Bill";
  closedAt?: Maybe<Scalars["Date"]["output"]>;
  createdAt?: Maybe<Scalars["Date"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  items?: Maybe<Array<BillMenuItem>>;
  restaurantTable?: Maybe<RestaurantTable>;
  restaurantTableId?: Maybe<Scalars["Int"]["output"]>;
  updatedAt?: Maybe<Scalars["Date"]["output"]>;
};

export type BillMenuItem = {
  __typename?: "BillMenuItem";
  bill?: Maybe<Bill>;
  billId?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  menuItem?: Maybe<MenuItem>;
  menuItemId?: Maybe<Scalars["Int"]["output"]>;
};

export type MenuItem = {
  __typename?: "MenuItem";
  bills?: Maybe<Array<BillMenuItem>>;
  id?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  price?: Maybe<Scalars["Float"]["output"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addItemToBill?: Maybe<Bill>;
  closeBill?: Maybe<Bill>;
  openBill?: Maybe<Bill>;
  removeItemFromBill?: Maybe<Bill>;
};

export type MutationAddItemToBillArgs = {
  id: Scalars["Int"]["input"];
  menuItemId: Scalars["Int"]["input"];
};

export type MutationCloseBillArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationOpenBillArgs = {
  restaurantTableId: Scalars["Int"]["input"];
};

export type MutationRemoveItemFromBillArgs = {
  id: Scalars["Int"]["input"];
  menuItemId: Scalars["Int"]["input"];
};

export type Query = {
  __typename?: "Query";
  bill?: Maybe<Bill>;
  billMenuItem?: Maybe<BillMenuItem>;
  billMenuItems?: Maybe<Array<BillMenuItem>>;
  bills?: Maybe<Array<Bill>>;
  menuItem?: Maybe<MenuItem>;
  menuItems?: Maybe<Array<MenuItem>>;
  restaurantTable?: Maybe<RestaurantTable>;
  restaurantTables?: Maybe<Array<RestaurantTable>>;
};

export type QueryBillArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryBillMenuItemArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryMenuItemArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryRestaurantTableArgs = {
  id: Scalars["Int"]["input"];
};

export type RestaurantTable = {
  __typename?: "RestaurantTable";
  bill?: Maybe<Bill>;
  id?: Maybe<Scalars["Int"]["output"]>;
  tableNo?: Maybe<Scalars["Int"]["output"]>;
};

export type BillDetailsFragment = {
  __typename?: "Bill";
  id?: number | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  closedAt?: any | null;
  restaurantTableId?: number | null;
  items?: Array<{
    __typename?: "BillMenuItem";
    menuItemId?: number | null;
  }> | null;
} & { " $fragmentName"?: "BillDetailsFragment" };

export type CloseBillMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type CloseBillMutation = {
  __typename?: "Mutation";
  closeBill?: { __typename?: "Bill"; id?: number | null } | null;
};

export type OpenBillMutationVariables = Exact<{
  restaurantTableId: Scalars["Int"]["input"];
}>;

export type OpenBillMutation = {
  __typename?: "Mutation";
  openBill?: { __typename?: "Bill"; id?: number | null } | null;
};

export type AddItemToBillMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  menuItemId: Scalars["Int"]["input"];
}>;

export type AddItemToBillMutation = {
  __typename?: "Mutation";
  addItemToBill?: { __typename?: "Bill"; id?: number | null } | null;
};

export type RemoveItemFromBillMutationVariables = Exact<{
  id: Scalars["Int"]["input"];
  menuItemId: Scalars["Int"]["input"];
}>;

export type RemoveItemFromBillMutation = {
  __typename?: "Mutation";
  removeItemFromBill?: { __typename?: "Bill"; id?: number | null } | null;
};

export type GetBillQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type GetBillQuery = {
  __typename?: "Query";
  bill?:
    | ({ __typename?: "Bill" } & {
        " $fragmentRefs"?: { BillDetailsFragment: BillDetailsFragment };
      })
    | null;
};

export type MenuItemDetailsFragment = {
  __typename?: "MenuItem";
  id?: number | null;
  name?: string | null;
  price?: number | null;
} & { " $fragmentName"?: "MenuItemDetailsFragment" };

export type GetMenuItemsQueryVariables = Exact<{ [key: string]: never }>;

export type GetMenuItemsQuery = {
  __typename?: "Query";
  menuItems?: Array<
    { __typename?: "MenuItem" } & {
      " $fragmentRefs"?: { MenuItemDetailsFragment: MenuItemDetailsFragment };
    }
  > | null;
};

export type TableDetailsFragment = {
  __typename?: "RestaurantTable";
  id?: number | null;
  tableNo?: number | null;
  bill?: { __typename?: "Bill"; id?: number | null } | null;
} & { " $fragmentName"?: "TableDetailsFragment" };

export type GetRestaurantTableQueryVariables = Exact<{
  restaurantTableId: Scalars["Int"]["input"];
}>;

export type GetRestaurantTableQuery = {
  __typename?: "Query";
  restaurantTable?:
    | ({ __typename?: "RestaurantTable" } & {
        " $fragmentRefs"?: { TableDetailsFragment: TableDetailsFragment };
      })
    | null;
};

export type GetRestaurantTablesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRestaurantTablesQuery = {
  __typename?: "Query";
  restaurantTables?: Array<{
    __typename?: "RestaurantTable";
    id?: number | null;
  }> | null;
};

export const BillDetailsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BillDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Bill" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "closedAt" } },
          { kind: "Field", name: { kind: "Name", value: "restaurantTableId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "menuItemId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BillDetailsFragment, unknown>;
export const MenuItemDetailsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MenuItemDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MenuItem" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MenuItemDetailsFragment, unknown>;
export const TableDetailsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TableDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "RestaurantTable" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "tableNo" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "bill" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TableDetailsFragment, unknown>;
export const CloseBillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CloseBill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "closeBill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CloseBillMutation, CloseBillMutationVariables>;
export const OpenBillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "OpenBill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantTableId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "openBill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "restaurantTableId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantTableId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<OpenBillMutation, OpenBillMutationVariables>;
export const AddItemToBillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddItemToBill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "menuItemId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addItemToBill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "menuItemId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "menuItemId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddItemToBillMutation,
  AddItemToBillMutationVariables
>;
export const RemoveItemFromBillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveItemFromBill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "menuItemId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeItemFromBill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "menuItemId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "menuItemId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveItemFromBillMutation,
  RemoveItemFromBillMutationVariables
>;
export const GetBillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetBill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "bill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "BillDetails" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "BillDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Bill" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
          { kind: "Field", name: { kind: "Name", value: "closedAt" } },
          { kind: "Field", name: { kind: "Name", value: "restaurantTableId" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "items" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "menuItemId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetBillQuery, GetBillQueryVariables>;
export const GetMenuItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMenuItems" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "menuItems" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "MenuItemDetails" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "MenuItemDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "MenuItem" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "price" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMenuItemsQuery, GetMenuItemsQueryVariables>;
export const GetRestaurantTableDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRestaurantTable" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "restaurantTableId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "restaurantTable" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "restaurantTableId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "TableDetails" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TableDetails" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "RestaurantTable" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "tableNo" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "bill" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRestaurantTableQuery,
  GetRestaurantTableQueryVariables
>;
export const GetRestaurantTablesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRestaurantTables" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "restaurantTables" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRestaurantTablesQuery,
  GetRestaurantTablesQueryVariables
>;
