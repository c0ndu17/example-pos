/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  fragment BillDetails on Bill {\n    id\n    createdAt\n    updatedAt\n    closedAt\n    restaurantTableId\n    items {\n      menuItemId\n    }\n  }\n":
    types.BillDetailsFragmentDoc,
  "\n  mutation CloseBill($id: Int!) {\n    closeBill(id: $id) {\n      id\n    }\n  }\n":
    types.CloseBillDocument,
  "\n  mutation OpenBill($restaurantTableId: Int!) {\n    openBill(restaurantTableId: $restaurantTableId) {\n      id\n    }\n  }\n":
    types.OpenBillDocument,
  "\n  mutation AddItemToBill($id: Int!, $menuItemId: Int!) {\n    addItemToBill(id: $id, menuItemId: $menuItemId) {\n      id\n    }\n  }\n":
    types.AddItemToBillDocument,
  "\n  mutation RemoveItemFromBill($id: Int!, $menuItemId: Int!) {\n    removeItemFromBill(id: $id, menuItemId: $menuItemId) {\n      id\n    }\n  }\n":
    types.RemoveItemFromBillDocument,
  "\n  query GetBill($id: Int!) {\n    bill(id: $id) {\n      ...BillDetails\n    }\n  }\n":
    types.GetBillDocument,
  "\n  fragment MenuItemDetails on MenuItem {\n    id\n    name\n    price\n  }\n":
    types.MenuItemDetailsFragmentDoc,
  "\n  query GetMenuItems {\n    menuItems {\n      ...MenuItemDetails\n    }\n  }\n":
    types.GetMenuItemsDocument,
  "\n  fragment TableDetails on RestaurantTable {\n    id\n    tableNo\n    bill {\n      id\n    }\n  }\n":
    types.TableDetailsFragmentDoc,
  "\n  query GetRestaurantTable($restaurantTableId: Int!) {\n    restaurantTable(id: $restaurantTableId) {\n      ...TableDetails\n    }\n  }\n":
    types.GetRestaurantTableDocument,
  "\n  query GetRestaurantTables {\n    restaurantTables {\n      id\n    }\n  }\n":
    types.GetRestaurantTablesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment BillDetails on Bill {\n    id\n    createdAt\n    updatedAt\n    closedAt\n    restaurantTableId\n    items {\n      menuItemId\n    }\n  }\n",
): (typeof documents)["\n  fragment BillDetails on Bill {\n    id\n    createdAt\n    updatedAt\n    closedAt\n    restaurantTableId\n    items {\n      menuItemId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CloseBill($id: Int!) {\n    closeBill(id: $id) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation CloseBill($id: Int!) {\n    closeBill(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation OpenBill($restaurantTableId: Int!) {\n    openBill(restaurantTableId: $restaurantTableId) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation OpenBill($restaurantTableId: Int!) {\n    openBill(restaurantTableId: $restaurantTableId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation AddItemToBill($id: Int!, $menuItemId: Int!) {\n    addItemToBill(id: $id, menuItemId: $menuItemId) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation AddItemToBill($id: Int!, $menuItemId: Int!) {\n    addItemToBill(id: $id, menuItemId: $menuItemId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation RemoveItemFromBill($id: Int!, $menuItemId: Int!) {\n    removeItemFromBill(id: $id, menuItemId: $menuItemId) {\n      id\n    }\n  }\n",
): (typeof documents)["\n  mutation RemoveItemFromBill($id: Int!, $menuItemId: Int!) {\n    removeItemFromBill(id: $id, menuItemId: $menuItemId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetBill($id: Int!) {\n    bill(id: $id) {\n      ...BillDetails\n    }\n  }\n",
): (typeof documents)["\n  query GetBill($id: Int!) {\n    bill(id: $id) {\n      ...BillDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment MenuItemDetails on MenuItem {\n    id\n    name\n    price\n  }\n",
): (typeof documents)["\n  fragment MenuItemDetails on MenuItem {\n    id\n    name\n    price\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetMenuItems {\n    menuItems {\n      ...MenuItemDetails\n    }\n  }\n",
): (typeof documents)["\n  query GetMenuItems {\n    menuItems {\n      ...MenuItemDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment TableDetails on RestaurantTable {\n    id\n    tableNo\n    bill {\n      id\n    }\n  }\n",
): (typeof documents)["\n  fragment TableDetails on RestaurantTable {\n    id\n    tableNo\n    bill {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetRestaurantTable($restaurantTableId: Int!) {\n    restaurantTable(id: $restaurantTableId) {\n      ...TableDetails\n    }\n  }\n",
): (typeof documents)["\n  query GetRestaurantTable($restaurantTableId: Int!) {\n    restaurantTable(id: $restaurantTableId) {\n      ...TableDetails\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetRestaurantTables {\n    restaurantTables {\n      id\n    }\n  }\n",
): (typeof documents)["\n  query GetRestaurantTables {\n    restaurantTables {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
