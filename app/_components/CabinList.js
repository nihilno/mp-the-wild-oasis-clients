import { getCabins } from "@/app/_lib/data-service";
import { connection } from "next/server";
import CabinCard from "./CabinCard";

async function CabinList({ filter }) {
  await connection();

  const cabins = await getCabins();
  if (!cabins.length) return null;

  const filteredCabins =
    {
      all: cabins,
      small: cabins.filter((cabin) => cabin.maxCapacity <= 3),
      medium: cabins.filter(
        (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 6,
      ),
      large: cabins.filter((cabin) => cabin.maxCapacity > 6),
    }[filter] || cabins;

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
