import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

interface FormData {
  _id: string;
  department: string;
  description: string;
  room_number: string;
  serial_number: string;
  createdAt: string;
  updatedAt: string;
}

const Content = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [issues, setIssues] = useState<FormData[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    async function getIssues() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/issues", {
          signal: controller.signal,
        });
        setIssues(data);
      } catch (error) {
        console.error(error);
      }
    }
    getIssues();
    return () => controller.abort();
  }, []);

  return (
    <SimpleGrid
      spacing={5}
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      margin={3}
      width="50vw"
    >
      {issues.map((issue) => (
        <Card key={issue._id}>
          <CardHeader>
            <Heading size="md">{issue.department}</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              <strong>Description: </strong>
              {issue.description}
            </Text>
            <Text>
              <strong>Room Number: </strong>
              {issue.room_number}
            </Text>
            <Text>
              <strong>Serial Number: </strong>
              {issue.serial_number}
            </Text>
          </CardBody>
          <CardFooter>
            <Button onClick={onOpen} boxShadow="0 4px 8px 0 rgba(0,0,0,0.9)">
              View here
            </Button>
            <Button
              colorScheme="teal"
              boxShadow="0 4px 8px 0 rgba(0,0,0,0.9)"
              marginLeft={10}
            >
              Created : {formatDistanceToNow(issue.createdAt)}
              <br />
              Updated : {formatDistanceToNow(issue.updatedAt)}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{issue.department}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <strong>Description: </strong>
                  {issue.description}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
  //   <Grid templateColumns="repeat(4, 1fv" gap={5}></Grid>;
};

export default Content;
