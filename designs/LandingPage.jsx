import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Avatar,
  Badge,
  Image,
} from '@chakra-ui/react';
import { FiCalendar, FiZap, FiTrendingUp, FiStar, FiCheck } from 'react-icons/fi';

const LandingPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const accentColor = 'purple.500';

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero Section */}
      <Container maxW="7xl" pt={20} pb={32}>
        <VStack spacing={8} textAlign="center">
          <Badge colorScheme="purple" fontSize="md" px={4} py={2} borderRadius="full">
            🚀 AI-Powered Booking Platform
          </Badge>
          <Heading
            as="h1"
            size="3xl"
            bgGradient="linear(to-r, purple.400, pink.500, orange.400)"
            bgClip="text"
            fontWeight="extrabold"
            lineHeight="1.2"
          >
            Automate Your Booking Process
            <br />
            With AI Intelligence
          </Heading>
          <Text fontSize="xl" color="gray.500" maxW="2xl">
            Transform your scheduling workflow with our intelligent automation platform.
            Save hours every week and never miss another appointment.
          </Text>
          <HStack spacing={4} pt={4}>
            <Button
              size="lg"
              colorScheme="purple"
              rightIcon={<Icon as={FiZap} />}
              px={8}
              py={6}
              fontSize="lg"
              borderRadius="xl"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="purple"
              px={8}
              py={6}
              fontSize="lg"
              borderRadius="xl"
            >
              Watch Demo
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl">Powerful Features for Modern Teams</Heading>
            <Text fontSize="lg" color="gray.500" maxW="2xl">
              Everything you need to manage bookings efficiently
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {[
              {
                icon: FiCalendar,
                title: 'Smart Scheduling',
                description: 'AI-powered calendar optimization that finds the perfect time slots',
              },
              {
                icon: FiZap,
                title: 'Instant Automation',
                description: 'Automatic confirmations, reminders, and follow-ups',
              },
              {
                icon: FiTrendingUp,
                title: 'Analytics Dashboard',
                description: 'Real-time insights into your booking performance',
              },
            ].map((feature, idx) => (
              <Box
                key={idx}
                bg={cardBg}
                p={8}
                borderRadius="2xl"
                boxShadow="xl"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl' }}
              >
                <Icon as={feature.icon} w={12} h={12} color={accentColor} mb={4} />
                <Heading size="md" mb={3}>
                  {feature.title}
                </Heading>
                <Text color="gray.500">{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Social Proof */}
      <Container maxW="7xl" py={20}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl">Trusted by 10,000+ Professionals</Heading>
            <Text fontSize="lg" color="gray.500">
              Join the growing community of smart bookers
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {[
              { name: 'Sarah Johnson', role: 'Marketing Manager', rating: 5 },
              { name: 'Mike Chen', role: 'Consultant', rating: 5 },
              { name: 'Emma Davis', role: 'Entrepreneur', rating: 5 },
            ].map((testimonial, idx) => (
              <Box
                key={idx}
                bg={cardBg}
                p={6}
                borderRadius="xl"
                boxShadow="lg"
              >
                <HStack mb={4}>
                  <Avatar name={testimonial.name} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{testimonial.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {testimonial.role}
                    </Text>
                  </VStack>
                </HStack>
                <HStack mb={2}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} as={FiStar} color="yellow.400" />
                  ))}
                </HStack>
                <Text color="gray.600">
                  "Game-changing tool for my business. Saves me 10+ hours weekly!"
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Container maxW="7xl" py={20}>
        <Box
          bg={cardBg}
          p={12}
          borderRadius="3xl"
          boxShadow="2xl"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading size="xl">Ready to Transform Your Workflow?</Heading>
            <Text fontSize="lg" color="gray.500" maxW="2xl">
              Start your 14-day free trial today. No credit card required.
            </Text>
            <Button
              size="lg"
              colorScheme="purple"
              rightIcon={<Icon as={FiCheck} />}
              px={10}
              py={6}
              fontSize="lg"
              borderRadius="xl"
            >
              Get Started Free
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
