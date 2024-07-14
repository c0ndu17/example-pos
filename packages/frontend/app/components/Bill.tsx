import { IdCardIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

import { graphql, useFragment } from "~/graphql/gql";

import { useGraphQL, useGraphQLMutation } from "~/hooks/useGraphQL";

import MenuItem, { MenuItemFragment, GetMenuItemsQuery } from "./MenuItem";
import { MenuItemDetailsFragment } from "~/graphql/gql/graphql";

export const BillFragment = graphql(`
  fragment BillDetails on Bill {
    id
    createdAt
    updatedAt
    closedAt
    restaurantTableId
    items {
      menuItemId
    }
  }
`);

export const CloseBillMutation = graphql(`
  mutation CloseBill($id: Int!) {
    closeBill(id: $id) {
      id
    }
  }
`);

export const OpenBillMutation = graphql(`
  mutation OpenBill($restaurantTableId: Int!) {
    openBill(restaurantTableId: $restaurantTableId) {
      id
    }
  }
`);

export const AddItemToBillMutation = graphql(`
  mutation AddItemToBill($id: Int!, $menuItemId: Int!) {
    addItemToBill(id: $id, menuItemId: $menuItemId) {
      id
    }
  }
`);

export const RemoveItemFromBillMutation = graphql(`
  mutation RemoveItemFromBill($id: Int!, $menuItemId: Int!) {
    removeItemFromBill(id: $id, menuItemId: $menuItemId) {
      id
    }
  }
`);

export const GetBillQuery = graphql(`
  query GetBill($id: Int!) {
    bill(id: $id) {
      ...BillDetails
    }
  }
`);

const calculateTotal = (
  ids: number[],
  menu: Record<number, MenuItemDetailsFragment>,
) => {
  return (
    ids?.reduce((sum, id) => sum + (menu[id]?.price ?? 0), 0.0) ?? 0.0
  ).toFixed(2);
};

// Normally, I'd use a utility function. underscore/lodash/ramda etc.
const getBillQuantities = (itemIds: number[]) => {
  return (
    itemIds?.reduce(
      (acc, id) => {
        if (acc[id]) {
          acc[id] += 1;
        } else {
          acc[id] = 1;
        }
        return acc;
      },
      {} as Record<number, number>,
    ) ?? {}
  );
};

export type BillProps = {
  billId?: number | null;
};

const generateMenu = <T extends Record<number, MenuItemDetailsFragment>>(
  items: MenuItemDetailsFragment[],
): T => {
  return (
    items?.reduce((acc, item) => {
      acc[item.id!] = item;
      return acc;
    }, {} as T) ?? {}
  );
};

const Bill = ({ billId }: BillProps) => {
  const { data: billData = { bill: {} } } = useGraphQL(GetBillQuery, {
    id: billId!,
  });
  const bill = useFragment(BillFragment, billData?.bill)!;
  const billItemIds = bill.items?.map((item) => item.menuItemId!) ?? [];

  const { data: menuItemData } = useGraphQL(GetMenuItemsQuery);
  const items = useFragment(MenuItemFragment, menuItemData?.menuItems) ?? [];
  const menu = generateMenu(items);

  const { mutate: addItemToBill, isPending: isAddPending } =
    useGraphQLMutation(AddItemToBillMutation) ?? {};
  const { mutate: removeItemFromBill, isPending: isRemovePending } =
    useGraphQLMutation(RemoveItemFromBillMutation) ?? {};
  const { mutate: closeBillMutation, isPending: isClosePending } =
    useGraphQLMutation(CloseBillMutation) ?? {};

  const isPending = isClosePending || isAddPending || isRemovePending;
  const billQuantities = getBillQuantities(billItemIds);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Items</div>
          <ul className="grid gap-3">
            {items?.map((item) => (
              <li className="flex items-center justify-between" key={item.id!}>
                <MenuItem
                  item={item}
                  quantity={billQuantities[item.id!]}
                  onAdd={() =>
                    addItemToBill({ id: billId!, menuItemId: item.id! })
                  }
                  onRemove={() =>
                    removeItemFromBill({ id: billId!, menuItemId: item.id! })
                  }
                />
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold mt-4">
              <span className="text-muted-foreground">Total: </span>
              <span>${calculateTotal(billItemIds, menu)}</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3 justify-between">
        <div className="text-xs text-muted-foreground">
          {bill.updatedAt ? (
            <span>
              Updated <time dateTime="2023-11-23">{bill.updatedAt}</time>
            </span>
          ) : null}
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="self-end"
          onClick={() => closeBillMutation({ id: billId! })}
          disabled={isPending}
        >
          <IdCardIcon className="h-4 w-4 mr-1" />
          <span>Pay Bill</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Bill;
