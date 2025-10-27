'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Icon,
  Avatar,
  IconButton,
  useColorModeValue,
  useColorMode,
  Collapse,
  Badge,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  icon: any;
  href: string;
  badge?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: FiHome,
    href: '/dashboard',
  },
  {
    label: 'Bookings',
    icon: FiCalendar,
    href: '/bookings',
    badge: '5',
  },
  {
    label: 'Clients',
    icon: FiUsers,
    href: '/clients',
  },
  {
    label: 'Analytics',
    icon: FiBarChart2,
    href: '/analytics',
  },
  {
    label: 'Settings',
    icon: FiSettings,
    href: '/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  const activeBg = useColorModeValue('purple.50', 'purple.900');
  const activeColor = useColorModeValue('purple.600', 'purple.300');

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <Flex
      direction="column"
      w="280px"
      h="100vh"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      position="sticky"
      top="0"
      left="0"
    >
      {/* Logo Section */}
      <Box p={6}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.400, pink.500, orange.400)"
          bgClip="text"
        >
          AutoBooker AI
        </Text>
      </Box>

      {/* Navigation Items */}
      <VStack align="stretch" flex="1" px={3} spacing={1} overflowY="auto">
        {navItems.map((item) => (
          <Box key={item.label}>
            <Link href={item.href} passHref legacyBehavior>
              <Box
                as="a"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={3}
                borderRadius="lg"
                cursor="pointer"
                bg={isActive(item.href) ? activeBg : 'transparent'}
                color={isActive(item.href) ? activeColor : undefined}
                _hover={{ bg: hoverBg }}
                transition="all 0.2s"
                fontWeight={isActive(item.href) ? 'semibold' : 'medium'}
              >
                <HStack spacing={3}>
                  <Icon as={item.icon} boxSize={5} />
                  <Text>{item.label}</Text>
                </HStack>
                {item.badge && (
                  <Badge colorScheme="purple" borderRadius="full">
                    {item.badge}
                  </Badge>
                )}
                {item.children && (
                  <Icon
                    as={expandedItems.includes(item.label) ? FiChevronDown : FiChevronRight}
                    boxSize={4}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpanded(item.label);
                    }}
                  />
                )}
              </Box>
            </Link>
            {item.children && (
              <Collapse in={expandedItems.includes(item.label)} animateOpacity>
                <VStack align="stretch" pl={8} mt={1} spacing={1}>
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} passHref legacyBehavior>
                      <Box
                        as="a"
                        display="flex"
                        alignItems="center"
                        px={4}
                        py={2}
                        borderRadius="md"
                        cursor="pointer"
                        bg={isActive(child.href) ? activeBg : 'transparent'}
                        color={isActive(child.href) ? activeColor : undefined}
                        _hover={{ bg: hoverBg }}
                        transition="all 0.2s"
                      >
                        <HStack spacing={3}>
                          <Icon as={child.icon} boxSize={4} />
                          <Text fontSize="sm">{child.label}</Text>
                        </HStack>
                      </Box>
                    </Link>
                  ))}
                </VStack>
              </Collapse>
            )}
          </Box>
        ))}
      </VStack>

      {/* Bottom Section */}
      <Box p={4} borderTop="1px" borderColor={borderColor}>
        <VStack spacing={3} align="stretch">
          {/* Theme Toggle */}
          <Flex
            align="center"
            justify="space-between"
            px={3}
            py={2}
            borderRadius="lg"
            cursor="pointer"
            _hover={{ bg: hoverBg }}
            onClick={toggleColorMode}
          >
            <HStack spacing={3}>
              <Icon as={colorMode === 'light' ? FiSun : FiMoon} boxSize={5} />
              <Text fontSize="sm">{colorMode === 'light' ? 'Light' : 'Dark'} Mode</Text>
            </HStack>
            <IconButton
              aria-label="Toggle theme"
              icon={<Icon as={colorMode === 'light' ? FiMoon : FiSun} />}
              size="sm"
              variant="ghost"
            />
          </Flex>

          {/* User Profile */}
          <Flex
            align="center"
            justify="space-between"
            px={3}
            py={2}
            borderRadius="lg"
            cursor="pointer"
            _hover={{ bg: hoverBg }}
          >
            <HStack spacing={3}>
              <Avatar size="sm" name="User Name" />
              <Box>
                <Text fontSize="sm" fontWeight="medium">
                  User Name
                </Text>
                <Text fontSize="xs" color="gray.500">
                  user@example.com
                </Text>
              </Box>
            </HStack>
            <IconButton
              aria-label="Logout"
              icon={<Icon as={FiLogOut} />}
              size="sm"
              variant="ghost"
            />
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
}
