import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  return (
    <IconButton
      size="sm"
      variant="solid"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};

export default ColorModeSwitcher;
