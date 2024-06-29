import React, { useEffect, useState } from "react";
import { Search } from "@swc-react/search";
import { getAllIcons } from "../get-icons";
const SearchInput = ({ onChange }) => {
  return <Search input={onChange}></Search>;
};

export default SearchInput;
