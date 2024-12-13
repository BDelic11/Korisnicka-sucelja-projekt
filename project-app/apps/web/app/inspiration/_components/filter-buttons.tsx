import { getAllTags } from "@/actions/utils/tags";
import FilterButton from "./filter-button";
import { Tag } from "@repo/db/types/tag";

const FilterButtons = async () => {
  const tagsData = await getAllTags();

  if (!tagsData) {
    return null;
  }

  return (
    <div className="flex flex-row gap-2 cursor-pointer my-4 md:my-8 overflow-x-auto hide-scrollbar ">
      {tagsData.map((tag: Tag) => (
        <FilterButton key={tag.id} tag={tag} />
      ))}
    </div>
  );
};

export default FilterButtons;
