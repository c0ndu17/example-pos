import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Button } from "~/components/ui/button";
import { graphql } from "~/graphql/gql";
import { MenuItemDetailsFragment } from "~/graphql/gql/graphql";

export const MenuItemFragment = graphql(`
  fragment MenuItemDetails on MenuItem {
    id
    name
    price
  }
`);

export const GetMenuItemsQuery = graphql(`
  query GetMenuItems {
    menuItems {
      ...MenuItemDetails
    }
  }
`);

type MenuItemProps = {
  item: MenuItemDetailsFragment;
  quantity: number | undefined;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

const MenuItem = ({ quantity = 0, item, onAdd, onRemove }: MenuItemProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <span>{item.name}</span>
      <span>{item.price}</span>
      <div
        className={clsx(
          "w-[96px]  flex items-center",
          quantity > 0 ? "justify-between" : "justify-end",
        )}
      >
        {quantity > 0 ? (
          <>
            <Button
              onClick={() => onRemove(item.id!)}
              variant={"destructive"}
              size={"icon"}
            >
              <MinusIcon />
            </Button>
            <span>{quantity}</span>
          </>
        ) : null}
        <Button onClick={() => onAdd(item.id!)} size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default MenuItem;
// <li className="flex items-center justify-between">
//                   <span className="text-muted-foreground">{item.name}</span>
//                   <span>{item.price}</span>
//                 </li>
