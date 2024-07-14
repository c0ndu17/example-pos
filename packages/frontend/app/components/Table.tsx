import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { IdCardIcon, PlusIcon } from "@radix-ui/react-icons";

import { graphql, useFragment } from "~/graphql/gql";

import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useGraphQL, useGraphQLMutation } from "~/hooks/useGraphQL";

import Bill, { OpenBillMutation } from "./Bill";

export const TableFragment = graphql(`
  fragment TableDetails on RestaurantTable {
    id
    tableNo
    bill {
      id
    }
  }
`);

const GetTableQuery = graphql(`
  query GetRestaurantTable($restaurantTableId: Int!) {
    restaurantTable(id: $restaurantTableId) {
      ...TableDetails
    }
  }
`);

type TableProps = {
  tableId: number;
};

const Table = ({ tableId }: TableProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: { restaurantTable = {} } = {} } = useGraphQL(GetTableQuery, {
    restaurantTableId: tableId,
  });
  const table = useFragment(TableFragment, restaurantTable);

  const { mutate: openBillMutation, isPending: isOpenPending } =
    useGraphQLMutation(OpenBillMutation) ?? {};

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={table?.bill?.id ? "default" : "secondary"}
            size={"lg"}
          >
            Table {table?.tableNo}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Table {table?.tableNo}</DialogTitle>
            <DialogDescription>
              View and manage the bill for this table.
            </DialogDescription>
          </DialogHeader>
          {table?.bill?.id ? (
            <Bill billId={table.bill.id} />
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => openBillMutation({ restaurantTableId: tableId })}
                disabled={isOpenPending}
                size={"lg"}
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                <span>Start Bill</span>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={table?.bill?.id ? "default" : "secondary"}>
          Table {table?.tableNo}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Table {table?.tableNo}</DrawerTitle>
          <DrawerDescription>
            View and manage the bill for this table.
          </DrawerDescription>
        </DrawerHeader>
        {table?.bill?.id ? (
          <Bill billId={table.bill.id} />
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={() => openBillMutation({ restaurantTableId: tableId })}
              disabled={isOpenPending}
              size={"lg"}
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              <span>Start Bill</span>
            </Button>
          </>
        )}
        <DrawerFooter className="pt-2">
          <div className="ml-auto mr-0 w-auto">
            <Button variant="destructive" size="sm">
              <IdCardIcon className="h-4 w-4 mr-1" />
              <span>Close Bill</span>
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Table;
