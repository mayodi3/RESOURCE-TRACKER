import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, InferType } from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

const schema = object({
  department: string()
    .required("Please enter the department you are currently in")
    .min(3, "Atleast 3 characters is required")
    .max(255),
  room_number: string()
    .required("Please enter room number you machine is in")
    .min(1, "Atleast 1 character is required")
    .max(100),
  serial_number: string()
    .required("Please enter serial number of the fualty machine")
    .min(1, "Atleast 1 character is required")
    .max(255),
  description: string()
    .required("Please specify exactly what is wrong with the machine")
    .min(50, "Enter minimum of 100 characters")
    .max(10000),
  phone_number: string().max(20).nullable(),
});

type FormData = InferType<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/issues",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  return (
    <form style={{ margin: "5px" }} onSubmit={handleSubmit(onSubmit)}>
      <FormControl width={"50vw"}>
        <FormLabel>Department</FormLabel>
        <Input
          {...register("department")}
          placeholder="From which department?"
          type="text"
        />
        <Text color="red">{errors.department?.message}</Text>
        <FormLabel paddingTop={2}>Room Number</FormLabel>
        <Input
          {...register("room_number")}
          type="number"
          placeholder="Exact room number"
        />
        <Text color="red">{errors.room_number?.message}</Text>
        <FormLabel paddingTop={2}>Serial Number</FormLabel>
        <Input
          {...register("serial_number")}
          type="text"
          placeholder="Serial Number of the item"
        />
        <Text color="red">{errors.serial_number?.message}</Text>
        <FormLabel paddingTop={2}>Description</FormLabel>
        <Textarea
          {...register("description")}
          placeholder="Enter a short description reporting the issue"
        />
        <Text color="red">{errors.description?.message}</Text>
        <FormLabel paddingTop={2}>Need Further Assistance ?</FormLabel>
        <InputGroup>
          <InputLeftAddon>+254</InputLeftAddon>
          <Input
            {...register("phone_number", { valueAsNumber: true })}
            type="tel"
            placeholder="Enter you phone number (Optional)"
          />
        </InputGroup>
      </FormControl>
      <Button
        marginTop={5}
        colorScheme="green"
        variant="outline"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
