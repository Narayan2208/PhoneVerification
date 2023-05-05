import logo from './logo.svg';
import './App.css';
import PhoneVerificationButton from './component/PhoneVerificationButton';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <>
       <ChakraProvider>
        <PhoneVerificationButton/>
       </ChakraProvider>
    </>
  );
}

export default App;
