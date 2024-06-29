import React, { useEffect, useState } from "react";
import { getAllIcons, Icon as IconType } from "../get-icons";
import Icon from "./Icon";
import { Flex } from "@adobe/react-spectrum";
import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
export interface Icon {
  filename: string;
  category: string;
  tags: string[];
  iconComponentName: string;
}
const IconsList: React.FC<{
  addOnUISdk: AddOnSDKAPI;
  searchTerm?: string;
}> = ({ searchTerm, addOnUISdk }) => {
  const [icons, setIcons] = useState<IconType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const iconsData = await getAllIcons(searchTerm);
        setIcons(iconsData);
      } catch (error) {
        console.error("Error fetching icons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIcons();
  }, [searchTerm]);

  if (loading) {
    return <div>Loading icons...</div>;
  }
  function normalizeString(s: string) {
    return s.toLowerCase().replace(/[!@#$%^&*(),.\][-]/g, "");
  }
  // function filterIcons(allIcons: Icon[], searchTerm: string): Icon[] {
  //   if (searchTerm) {
  //     const normalSearch = normalizeString(searchTerm!);
  //     let result = allIcons;

  //     for (const term of normalSearch.split(" ")) {
  //       result = result.filter((icon) => {
  //         return (
  //           normalizeString(icon.filename).includes(term) ||
  //           normalizeString(icon.category).includes(term) ||
  //           icon.tags.some((tag) => normalizeString(tag).includes(term))
  //         );
  //       });
  //     }

  //     return result;
  //   } else return allIcons;
  // }
  function filterIcons(allIcons: Icon[], searchTerm: string): Icon[] {
    if (searchTerm) {
      const normalSearch = normalizeString(searchTerm!);
      let result = allIcons;

      for (const term of normalSearch.split(" ")) {
        result = result.filter((icon) => {
          return (
            !normalizeString(icon.filename).includes("adobe") && // Exclude Adobe products by filename
            !normalizeString(icon.category).includes("adobe") && // Exclude Adobe products by category
            !icon.tags.some((tag) => normalizeString(tag).includes("adobe")) && // Exclude Adobe products by tags
            (normalizeString(icon.filename).includes(term) ||
              normalizeString(icon.category).includes(term) ||
              icon.tags.some((tag) => normalizeString(tag).includes(term)))
          );
        });
      }

      return result;
    } else {
      return allIcons.filter(
        (icon) =>
          !normalizeString(icon.filename).includes("adobe") && // Exclude Adobe products by filename
          !normalizeString(icon.category).includes("adobe") && // Exclude Adobe products by category
          !icon.tags.some((tag) => normalizeString(tag).includes("adobe")) // Exclude Adobe products by tags
      );
    }
  }
  const filteredIcons = filterIcons(icons, searchTerm);
  if (!filteredIcons.length) {
    return <Flex justifyContent={`center`}>No matching icons found.</Flex>;
  }
  return (
    <Flex wrap gap={16}>
      {filteredIcons.map((icon) => (
        <div key={icon.filename} className="icon-container">
          <Icon iconName={icon.iconComponentName} addOnUISdk={addOnUISdk} />
        </div>
      ))}
    </Flex>
  );
};

export default IconsList;
