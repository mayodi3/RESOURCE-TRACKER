import { Flex } from "@chakra-ui/react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Flex justify={["center", "space-around", "space-around"]} wrap="wrap">
        <Form />
        <Content />
      </Flex>
      <Footer />
    </div>
  );
};

export default App;
