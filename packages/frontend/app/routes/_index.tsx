import type { MetaFunction } from "@remix-run/node";

import { graphql } from "~/graphql/gql";
import { useGraphQL } from "~/hooks/useGraphQL";

import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import Table from "~/components/Table";

export const meta: MetaFunction = () => {
  return [
    { title: "Example | Point of Sale" },
    {
      name: "description",
      content: "https://xkcd.com/1095/",
    },
  ];
};

export const GetRestaurantTablesQuery = graphql(`
  query GetRestaurantTables {
    restaurantTables {
      id
    }
  }
`);

export default function Index() {
  const { data: { restaurantTables = [] } = {} } = useGraphQL(
    GetRestaurantTablesQuery,
  );

  return (
    <div className="relative flex min-h-screen min-w-screen">
      <ScrollArea className="max-w-[600px] lg:max-w-full w-full">
        <div className={"mb-4 flex items-center"}>
          <div className="p-4 size-full mx-auto max-w-[768px]">
            <h2 className="text-xl font-bold mb-4">Tables</h2>
            <ul className="p-2 space-2 flex justify-around">
              {restaurantTables?.map((table) => (
                <li
                  key={table.id}
                  className="flex justify-between items-center"
                >
                  <Table tableId={table.id!} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
