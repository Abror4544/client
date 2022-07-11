import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Swich to ${text} mode`}
      variant="ghost"
      color="current"
      ml="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
    />
  );
};

export default ColorModeSwitcher;
