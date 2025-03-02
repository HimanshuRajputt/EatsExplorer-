import React, { useRef, useState } from 'react';
import { 
  Box, 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  useToast,
  Container
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const form = useRef();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm('service_d103196', 'template_619xcjs', form.current, {
        publicKey: 'SUaBs2Sno0Oc0mFMv',
      })
      .then(
        () => {
          toast({
            title: "Message Sent",
            description: "Your message has been successfully submitted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          e.target.reset();
        },
        (error) => {
          toast({
            title: "Error",
            description: "Failed to send message. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log('FAILED...', error.text);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Container maxW="md" py={8}>
      <Box 
        borderWidth={1} 
        borderRadius="lg" 
        p={6} 
        boxShadow="md"
        bg="white"
      >
        <form ref={form} onSubmit={sendEmail}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="gray.800">Name</FormLabel>
              <Input 
                type="text" 
                name="from_name" 
                placeholder="Your Name"
                focusBorderColor="blue.500"
                color="gray.800"
                bg="gray.50"
                borderColor="gray.300"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.800">Email</FormLabel>
              <Input 
                type="email" 
                name="from_email" 
                placeholder="your.email@example.com"
                focusBorderColor="blue.500"
                color="gray.800"
                bg="gray.50"
                borderColor="gray.300"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.800">Message</FormLabel>
              <Textarea 
                name="message" 
                placeholder="Your message..."
                rows={4}
                focusBorderColor="blue.500"
                color="gray.800"
                bg="gray.50"
                borderColor="gray.300"
              />
            </FormControl>

            <Button 
              colorScheme="blue" 
              type="submit" 
              width="full"
              isLoading={isSubmitting}
            >
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default ContactSection;