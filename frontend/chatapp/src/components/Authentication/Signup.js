import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const [cshow, setcShow] = useState(false);

    const handleClick = () => setShow(!show);

    const handleClickon = () => setcShow(!cshow);

    const submitHandler = () => { };

    return (
        <VStack spacing={4}>
            <FormControl id="signup-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="signup-email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type="email"
                    placeholder="Enter Your Email"
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

            <FormControl id="signup-confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={cshow ? "text" : "password"}
                        placeholder="Confirm Your Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width={'4 rem'}>
                        <Button h="1.75 rem" size={"sm"} onClick={handleClickon} bgColor={'transparent'}
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                        >
                            {cshow ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme="teal" size="md" width="full"
                onClick={submitHandler}>
                Signup
            </Button>

        </VStack>
    );
};

export default Signup;
