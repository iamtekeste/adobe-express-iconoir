import csv from "csvtojson";
import * as AllIcons from "iconoir-react";
import { kebabCase, pascalCase } from "scule";
import iconsList from "./icons.csv";

export type Icon = {
  filename: string;
  category: string;
  tags: string[];
  iconComponentName: string;
};
const ICONS_PATH = "icons.csv";
const TAG_SEPARATOR = "|";

export async function getAllIcons(searchTerm: string): Promise<Icon[]> {
  const rows = await csv().fromString(iconsList);

  const icons: Icon[] = [];

  for (const row of rows) {
    const iconComponentName = pascalCase(row.filename);
    const iconComponentSolidName = pascalCase(`${row.filename}-solid`);

    const iconComponents = Object.keys(AllIcons).filter(
      (icon) =>
        (icon === iconComponentName || icon === iconComponentSolidName) &&
        (searchTerm === undefined ||
          iconComponentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          iconComponentSolidName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );

    if (iconComponents.length === 0)
      throw new Error(
        `Couldn't find icons for ${row.filename} (${iconComponentName}) in 'iconoir-react'.`
      );

    for (const iconComponent of iconComponents) {
      icons.push({
        filename: kebabCase(iconComponent),
        category: row.category,
        tags:
          row.tags?.split(TAG_SEPARATOR).map((item: string) => item.trim()) ||
          [],
        iconComponentName: iconComponent,
      });
    }
  }

  return icons;
}
