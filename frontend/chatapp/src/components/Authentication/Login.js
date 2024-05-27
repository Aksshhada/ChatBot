import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <VStack spacing={4}>
            <FormControl id="login-email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="signup-password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={'4 rem'}>
                        <Button h="1.75 rem" size={"sm"} onClick={handleClick} bgColor={'transparent'}
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                        >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme="teal" size="md" width="full">
                Login
            </Button>

        </VStack>
    );
};

export default Login;
