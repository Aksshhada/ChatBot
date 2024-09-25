import React, { useState, useEffect } from 'react';
import { VStack, FormControl, FormLabel, Input, Button, InputGroup, InputRightElement, Checkbox } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: 'Please fill all the fields.',
                position: 'bottom',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("/api/user/login", { email, password }, config);
            toast({
                title: 'Login Successful',
                position: 'bottom',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            if (rememberMe) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            navigate("/chats");

        } catch (error) {
            toast({
                title: 'Error Occurred',
                description: error.response && error.response.data && error.response.data.message ? error.response.data.message : error.message,
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    };

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

            <FormControl id="login-password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width={'4rem'}>
                        <Button h="1.75rem" size={"sm"} onClick={handleClick} bgColor={'transparent'}
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                        >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl display="flex" alignItems="center">
                <Checkbox isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>Remember Me</Checkbox>
            </FormControl>

            <Button colorScheme="dark blue" size="md" width="full"
                onClick={submitHandler}
                isLoading={loading}>
                Login
            </Button>
        </VStack>
    );
};

export default Login;
