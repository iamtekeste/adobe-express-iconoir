// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import { Search } from "@swc-react/search";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Theme } from "@swc-react/theme";
import React from "react";
import { DocumentSandboxApi } from "../../models/DocumentSandboxApi";
import "./App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import IconsList from "./IconsList";
import { Flex } from "@adobe/react-spectrum";
import { Link } from "@swc-react/link";

const App = ({
  addOnUISdk,
}: {
  addOnUISdk: AddOnSDKAPI;
  sandboxProxy: DocumentSandboxApi;
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  function handleSearchChange(event: Event) {
    //@ts-ignore
    setSearchTerm(event.target.value);
  }
  return (
    <Theme theme="express" scale="medium" color="light">
      <div className="container">
        <Flex direction={`column`} gap={16}>
          <Search input={handleSearchChange}></Search>
          <IconsList
            searchTerm={searchTerm}
            addOnUISdk={addOnUISdk}
          ></IconsList>
        </Flex>
        <Flex UNSAFE_className="footer" justifyContent={`center`}>
          Icons by&nbsp;
          <Link href="https://iconoir.com/" target="_blank">
            Iconoir
          </Link>
          , &nbsp;
          <Link href="https://x.com/tkmadeit" target="_blank">
            {" "}
            Addon by @tkmadeit
          </Link>
        </Flex>
      </div>
    </Theme>
  );
};

export default App;
