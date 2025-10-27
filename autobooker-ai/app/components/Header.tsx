'use client';

import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'Dashboard' }: HeaderProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const inputBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px={8}
      py={4}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top="0"
      zIndex="sticky"
    >
      {/* Title */}
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>

      {/* Right Side Actions */}
      <HStack spacing={4}>
        {/* Search */}
        <InputGroup maxW="400px" display={{ base: 'none', md: 'flex' }}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            bg={inputBg}
            border="none"
            borderRadius="lg"
            _focus={{
              boxShadow: '0 0 0 1px purple.500',
            }}
          />
        </InputGroup>

        {/* Notifications */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={
              <Box position="relative">
                <Icon as={FiBell} />
                <Badge
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  colorScheme="red"
                  borderRadius="full"
                  boxSize="8px"
                />
              </Box>
            }
            variant="ghost"
            borderRadius="lg"
            aria-label="Notifications"
          />
          <MenuList>
            <MenuItem>
              <Box>
                <Text fontWeight="medium">New Booking</Text>
                <Text fontSize="sm" color="gray.500">
                  John Doe booked a consultation
                </Text>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box>
                <Text fontWeight="medium">Reminder</Text>
                <Text fontSize="sm" color="gray.500">
                  Meeting in 1 hour with Jane Smith
                </Text>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem color="purple.500">View all notifications</MenuItem>
          </MenuList>
        </Menu>

        {/* Settings */}
        <IconButton
          icon={<Icon as={FiSettings} />}
          variant="ghost"
          borderRadius="lg"
          aria-label="Settings"
        />

        {/* User Menu */}
        <Menu>
          <MenuButton as={Box} cursor="pointer">
            <Avatar size="sm" name="User Name" />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />}>Profile</MenuItem>
            <MenuItem icon={<FiSettings />}>Account Settings</MenuItem>
            <Divider />
            <MenuItem icon={<FiLogOut />} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
