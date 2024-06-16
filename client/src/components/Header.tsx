import { Flex, Switch, Text, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align={"center"} justify={["space-evenly"]}>
      <Text
        className="heading"
        fontSize={["sm", "md", "xl", "4xl"]}
        marginRight={10}
      >
        Vihiga Resource Tracker
      </Text>
      <Switch
        onChange={toggleColorMode}
        isChecked={colorMode === "dark" ? true : false}
        className="switch"
      />
    </Flex>
  );
};

export default Header;
