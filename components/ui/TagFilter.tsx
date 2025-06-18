"use client";

import { TagFilterProps } from "@/lib/types/game";

export function TagFilter({
  tags,
  selectedTags,
  onTagToggle,
  className = "",
}: TagFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`tag-filter ${isSelected ? "active" : ""}`}
            aria-pressed={isSelected}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
