import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import "./App.css"

const App = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [nameUpd, setNameUpd] = useState("");
  const [emailUpd, setEmailUpd] = useState("");
  const [numberUpd, setNumberUpd] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  let [dataValue, setDataValue] = useState();
  let [clickValue, setClickValue] = useState();
useEffect(()=>{
  axios.get("/api").then((res)=>{
    console.log("hey", res.data);
    setDataValue(res.data.results);
    setClickValue(res.data.clickResults);
    console.log(dataValue, clickValue);
  })
}, [])

  const submitHandler = async (e) => {
    setLoading(true);
    const type = "add";
    if (!email || !name || !number) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      console.log("hey17");
       axios.post(
        "/api",
        { email, name, number, type },
        config
      );
      // console.log(JSON.stringify(data));
      toast({
        title: "Data Added Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      // history.push('/')
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const submitHandler1 = async () => {
    setLoading(true);
    const type = "update";
    if (!emailUpd || !nameUpd || !numberUpd) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      axios.put(
        "/api",
        { emailUpd, nameUpd, numberUpd, type },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Successfully Updated",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div className="details">
    <div className="detail_component1">
    <VStack spacing="10px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <InputGroup size="md">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
        </InputGroup>
      </FormControl>
      <FormControl id="mobile" isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <InputGroup size="md">
          <Input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
            placeholder="Enter Your Mobile Number"
          />
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue"width="100%"style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>Add Details</Button>
    </VStack>
    </div>
    <div className="detail_component2">
    <VStack spacing="10px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={nameUpd}
          type="text"
          placeholder="Enter the Name of the Person whose Detail you want to update"
          onChange={(e) => setNameUpd(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <InputGroup size="md">
          <Input
            value={emailUpd}
            onChange={(e) => setEmailUpd(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
        </InputGroup>
      </FormControl>
      <FormControl id="mobile" isRequired>
        <FormLabel>Mobile Number</FormLabel>
        <InputGroup size="md">
          <Input
            value={numberUpd}
            onChange={(e) => setNumberUpd(e.target.value)}
            type="text"
            placeholder="Enter Your Mobile Number"
          />
        </InputGroup>
      </FormControl>
      <Button colorScheme="blue"width="100%"style={{ marginTop: 15 }} onClick={submitHandler1} isLoading={loading}>Update Details</Button>
    </VStack>
    </div>
    <div className="full">
      <p>Number of Clicks on Add Button : {clickValue?.addClicks}</p>
      <p>Number of Clicks on Update Button : {clickValue?.updateClicks}</p>
    </div>
    <div className="data">
    {/* {console.log(dataValue)} */}
      {
        dataValue?.map((res, index)=>{
        return(
          <div key={index}>
          <div>Name : {res?.name}</div>
          <div>Email : {res?.email}</div>
          <div>Mobile Number : {res?.mobile}</div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default App;