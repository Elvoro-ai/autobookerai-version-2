import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  useColorModeValue,
  Icon,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  RadioGroup,
  Radio,
  Stack,
  Checkbox,
} from '@chakra-ui/react';
import {
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
  FiUser,
  FiCalendar,
  FiBriefcase,
  FiSettings,
} from 'react-icons/fi';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessType: '',
    timezone: '',
    workingHours: '',
    services: [],
    notificationPreferences: 'email',
  });

  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const steps = [
    { id: 1, title: 'Personal Info', icon: FiUser },
    { id: 2, title: 'Business Details', icon: FiBriefcase },
    { id: 3, title: 'Availability', icon: FiCalendar },
    { id: 4, title: 'Preferences', icon: FiSettings },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                placeholder="John Doe"
                size="lg"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="john@example.com"
                size="lg"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                size="lg"
              />
            </FormControl>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Business Type</FormLabel>
              <Select
                placeholder="Select business type"
                size="lg"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
              >
                <option value="consulting">Consulting</option>
                <option value="coaching">Coaching</option>
                <option value="healthcare">Healthcare</option>
                <option value="legal">Legal Services</option>
                <option value="salon">Salon & Spa</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Business Name</FormLabel>
              <Input
                placeholder="Your Company Name"
                size="lg"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Business Description</FormLabel>
              <Textarea
                placeholder="Tell us about your business..."
                rows={4}
                size="lg"
              />
            </FormControl>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Timezone</FormLabel>
              <Select
                placeholder="Select your timezone"
                size="lg"
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
              >
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="UTC">UTC</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Typical Working Hours</FormLabel>
              <Select
                placeholder="Select working hours"
                size="lg"
                value={formData.workingHours}
                onChange={(e) => handleInputChange('workingHours', e.target.value)}
              >
                <option value="9-5">9 AM - 5 PM</option>
                <option value="8-4">8 AM - 4 PM</option>
                <option value="10-6">10 AM - 6 PM</option>
                <option value="flexible">Flexible</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Working Days</FormLabel>
              <Stack spacing={3}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
                  (day) => (
                    <Checkbox key={day} size="lg">
                      {day}
                    </Checkbox>
                  )
                )}
              </Stack>
            </FormControl>
          </VStack>
        );

      case 4:
        return (
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Notification Preferences</FormLabel>
              <RadioGroup
                value={formData.notificationPreferences}
                onChange={(value) => handleInputChange('notificationPreferences', value)}
              >
                <Stack spacing={4}>
                  <Radio value="email" size="lg">
                    Email notifications only
                  </Radio>
                  <Radio value="sms" size="lg">
                    SMS notifications only
                  </Radio>
                  <Radio value="both" size="lg">
                    Both email and SMS
                  </Radio>
                  <Radio value="none" size="lg">
                    No notifications
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Auto-Confirmation</FormLabel>
              <Checkbox size="lg">Automatically confirm bookings</Checkbox>
            </FormControl>

            <FormControl>
              <FormLabel>Reminder Settings</FormLabel>
              <Stack spacing={3}>
                <Checkbox size="lg" defaultChecked>
                  Send reminder 24 hours before
                </Checkbox>
                <Checkbox size="lg" defaultChecked>
                  Send reminder 1 hour before
                </Checkbox>
                <Checkbox size="lg">Send follow-up after appointment</Checkbox>
              </Stack>
            </FormControl>
          </VStack>
        );

      default:
        return null;
    }
  };

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="4xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, purple.400, pink.500)"
              bgClip="text"
            >
              Welcome to AutoBooker AI
            </Heading>
            <Text fontSize="lg" color="gray.500">
              Let's set up your account in just a few steps
            </Text>
          </VStack>

          {/* Progress Bar */}
          <Box>
            <Progress
              value={progressPercent}
              colorScheme="purple"
              size="sm"
              borderRadius="full"
              mb={4}
            />
            <Text fontSize="sm" color="gray.500" textAlign="center">
              Step {currentStep} of {totalSteps}
            </Text>
          </Box>

          {/* Step Indicators */}
          <HStack spacing={4} justify="center">
            {steps.map((step) => (
              <VStack key={step.id} spacing={2} flex={1}>
                <Flex
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  bg={currentStep >= step.id ? 'purple.500' : cardBg}
                  border="2px"
                  borderColor={currentStep >= step.id ? 'purple.500' : borderColor}
                  align="center"
                  justify="center"
                  transition="all 0.3s"
                >
                  {currentStep > step.id ? (
                    <Icon as={FiCheck} color="white" w={6} h={6} />
                  ) : (
                    <Icon
                      as={step.icon}
                      color={currentStep === step.id ? 'white' : 'gray.400'}
                      w={5}
                      h={5}
                    />
                  )}
                </Flex>
                <Text
                  fontSize="sm"
                  fontWeight={currentStep === step.id ? 'bold' : 'normal'}
                  color={currentStep >= step.id ? 'purple.500' : 'gray.500'}
                >
                  {step.title}
                </Text>
              </VStack>
            ))}
          </HStack>

          {/* Form Card */}
          <Box
            bg={cardBg}
            p={8}
            borderRadius="2xl"
            boxShadow="xl"
            border="1px"
            borderColor={borderColor}
          >
            {renderStepContent()}
          </Box>

          {/* Navigation Buttons */}
          <HStack spacing={4} justify="space-between">
            <Button
              leftIcon={<Icon as={FiArrowLeft} />}
              size="lg"
              variant="outline"
              onClick={handlePrevious}
              isDisabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                rightIcon={<Icon as={FiArrowRight} />}
                size="lg"
                colorScheme="purple"
                onClick={handleNext}
              >
                Next Step
              </Button>
            ) : (
              <Button
                rightIcon={<Icon as={FiCheck} />}
                size="lg"
                colorScheme="purple"
              >
                Complete Setup
              </Button>
            )}
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default OnboardingPage;
