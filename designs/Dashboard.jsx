import React, { useState } from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  IconButton,
  VStack,
  HStack,
  Avatar,
  Badge,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiBell,
  FiSearch,
  FiMoreVertical,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'bookings', label: 'Bookings', icon: FiCalendar },
    { id: 'clients', label: 'Clients', icon: FiUsers },
    { id: 'analytics', label: 'Analytics', icon: FiBarChart2 },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const recentBookings = [
    {
      id: 1,
      client: 'John Doe',
      service: 'Consultation',
      date: '2025-10-28',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: 2,
      client: 'Jane Smith',
      service: 'Strategy Session',
      date: '2025-10-28',
      time: '2:00 PM',
      status: 'pending',
    },
    {
      id: 3,
      client: 'Mike Johnson',
      service: 'Follow-up',
      date: '2025-10-29',
      time: '11:30 AM',
      status: 'confirmed',
    },
  ];

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar */}
      <Box
        w="280px"
        bg={sidebarBg}
        borderRight="1px"
        borderColor={borderColor}
        p={6}
        display="flex"
        flexDirection="column"
      >
        <VStack align="stretch" spacing={8}>
          {/* Logo */}
          <Heading size="lg" bgGradient="linear(to-r, purple.400, pink.500)" bgClip="text">
            AutoBooker AI
          </Heading>

          {/* Navigation */}
          <VStack align="stretch" spacing={2}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                leftIcon={<Icon as={item.icon} />}
                justifyContent="flex-start"
                variant={activeNav === item.id ? 'solid' : 'ghost'}
                colorScheme={activeNav === item.id ? 'purple' : 'gray'}
                onClick={() => setActiveNav(item.id)}
                size="lg"
                fontWeight="medium"
              >
                {item.label}
              </Button>
            ))}
          </VStack>
        </VStack>

        {/* User Profile */}
        <Box mt="auto" pt={6} borderTop="1px" borderColor={borderColor}>
          <HStack>
            <Avatar name="User Name" size="sm" />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="bold">
                User Name
              </Text>
              <Text fontSize="xs" color="gray.500">
                user@example.com
              </Text>
            </VStack>
            <IconButton
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
              aria-label="User menu"
            />
          </HStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Flex flex={1} direction="column" overflow="hidden">
        {/* Header */}
        <Flex
          bg={cardBg}
          borderBottom="1px"
          borderColor={borderColor}
          px={8}
          py={4}
          align="center"
          justify="space-between"
        >
          <Heading size="lg">Dashboard</Heading>
          <HStack spacing={4}>
            <InputGroup maxW="300px">
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Search..." borderRadius="lg" />
            </InputGroup>
            <IconButton
              icon={<FiBell />}
              variant="ghost"
              borderRadius="lg"
              aria-label="Notifications"
            />
          </HStack>
        </Flex>

        {/* Dashboard Content */}
        <Box flex={1} overflow="auto" bg={bgColor} p={8}>
          <VStack align="stretch" spacing={8}>
            {/* Stats Grid */}
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem>
                <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="sm">
                  <Stat>
                    <StatLabel color="gray.500" fontSize="sm">
                      Total Bookings
                    </StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="bold">
                      152
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      23.5%
                    </StatHelpText>
                  </Stat>
                  <Icon as={FiCalendar} w={8} h={8} color="purple.500" mt={2} />
                </Box>
              </GridItem>

              <GridItem>
                <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="sm">
                  <Stat>
                    <StatLabel color="gray.500" fontSize="sm">
                      Active Clients
                    </StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="bold">
                      48
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      12.3%
                    </StatHelpText>
                  </Stat>
                  <Icon as={FiUsers} w={8} h={8} color="blue.500" mt={2} />
                </Box>
              </GridItem>

              <GridItem>
                <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="sm">
                  <Stat>
                    <StatLabel color="gray.500" fontSize="sm">
                      Completion Rate
                    </StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="bold">
                      94%
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      3.2%
                    </StatHelpText>
                  </Stat>
                  <Icon as={FiCheckCircle} w={8} h={8} color="green.500" mt={2} />
                </Box>
              </GridItem>

              <GridItem>
                <Box bg={cardBg} p={6} borderRadius="xl" boxShadow="sm">
                  <Stat>
                    <StatLabel color="gray.500" fontSize="sm">
                      Avg Response
                    </StatLabel>
                    <StatNumber fontSize="3xl" fontWeight="bold">
                      2.4h
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="decrease" />
                      8.1%
                    </StatHelpText>
                  </Stat>
                  <Icon as={FiClock} w={8} h={8} color="orange.500" mt={2} />
                </Box>
              </GridItem>
            </Grid>

            {/* Recent Bookings */}
            <Box bg={cardBg} borderRadius="xl" boxShadow="sm" p={6}>
              <Flex justify="space-between" align="center" mb={6}>
                <Heading size="md">Recent Bookings</Heading>
                <Button size="sm" variant="ghost" colorScheme="purple">
                  View All
                </Button>
              </Flex>

              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Client</Th>
                    <Th>Service</Th>
                    <Th>Date & Time</Th>
                    <Th>Status</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentBookings.map((booking) => (
                    <Tr key={booking.id}>
                      <Td>
                        <HStack>
                          <Avatar name={booking.client} size="sm" />
                          <Text fontWeight="medium">{booking.client}</Text>
                        </HStack>
                      </Td>
                      <Td>{booking.service}</Td>
                      <Td>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm">{booking.date}</Text>
                          <Text fontSize="xs" color="gray.500">
                            {booking.time}
                          </Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={booking.status === 'confirmed' ? 'green' : 'yellow'}
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {booking.status}
                        </Badge>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem>View Details</MenuItem>
                            <MenuItem>Reschedule</MenuItem>
                            <MenuItem>Cancel</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
