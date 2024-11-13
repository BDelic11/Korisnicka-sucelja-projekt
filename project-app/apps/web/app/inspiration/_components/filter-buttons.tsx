import { Tags } from "@repo/db/types/post";
import FilterButton from "./filter-button";

const FilterButtons = () => {
  const tags = Object.values(Tags);
  return (
    <div className="flex flex-row gap-2 cursor-pointer my-4 md:my-8">
      {tags.map((tag, index) => (
        <FilterButton key={index} tag={tag} index={index} />
      ))}
    </div>
  );
};

export default FilterButtons;
