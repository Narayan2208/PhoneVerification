import { useState, useRef, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,ModalFooter,useDisclosure,Box, Text
} from "@chakra-ui/react";

const PhoneVerificationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (isModalOpen) {
      console.log("enter in useEffect");
      otpInputs.current[0]?.focus();
    }
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event, index) => {
    const newOtp = [...otp];
    const input = event.target.value;

    // Check if the input is numeric and not longer than one character
    if (!isNaN(input) && input.length <= 1) {
      // Set the new digit in the OTP array
      newOtp[index] = input;
      setOtp(newOtp);

      // Move focus to the next input field
      if (index < 5 && input.length === 1) {
        otpInputs.current[index + 1].focus();
      }
    } else {
      // If input is not numeric or longer than one character, prevent input and move focus to the previous input field
      
      event.target.value = "";
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
    console.log(newOtp, "newotp");

    
  };

  // when user will press backspace then it will focus on previous index
  const handleKeyUp = (event, index) => {
    if (event.key === "Backspace") {
      console.log(event.key, "keycode");

      const prevIndex = index - 1;
      if (otpInputs.current[prevIndex]) {
        otpInputs.current[prevIndex].focus();
      }
    }
  };

  //when user will press right arrow or leftarrow it will focus according the event.
  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case "ArrowLeft":
        if (index > 0) {
          otpInputs.current[index - 1].focus();
        }
        break;
      case "ArrowRight":
        if (index < 5) {
          otpInputs.current[index + 1].focus();
        }
        break;
      default:
        break;
    }
  };

   //function for clicpboard past
  const handlePaste = (event) => {
    event.preventDefault();
  
    const clipboardData = event.clipboardData.getData("text");
    const otpArray = clipboardData
      .slice(0, 6)
      .split("")
      .map((digit) => (!isNaN(digit) && digit.length === 1 ? digit : ""));
  
    setOtp(otpArray);
  };

  
  return (
    <>
      <Button onClick={handleOpenModal}>Verify Phone Number</Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
      <Box margin={"auto"}> <Text fontSize={"30px"} fontWeight={"bold"} color={"green"}>Phone Varification</Text></Box>
          <ModalHeader textAlign={"center"}>Enter the OTP you recive on 86173xxx94</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {otp.map((e, idx) => {
              console.log(e);
              return (
                <Input
                  key={idx}
                  ref={(ref) => (otpInputs.current[idx] = ref)}
                  value={e}
                  onChange={(event) => handleInputChange(event, idx)}
                  onPaste={handlePaste}
                  onKeyUp={(event) => {
                    handleKeyUp(event, idx);
                  }}
                  onKeyDown={(event) => {
                    handleKeyDown(event, idx);
                  }}
                  maxLength={1}
                  width={10}
                  mr={2}
                  type="number"
                  borderBottom={"2px solid green"}
                  
                />
              );
            })}
            <Box mt={"10px"} display={"flex"}  justifyContent={"space-between"}>
            <Text fontWeight={"bold"} color={"rgb(72,112,175)"}>Change Number</Text>
            <Text fontWeight={"bold"} color={"rgb(72,112,175)"}>Re-send OTP</Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button background={"rgb(109,181,138)"} color={"white"} fontWeight={"bold"} mr={3} onClick={onClose}>
              Verify your phone number
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PhoneVerificationButton;
