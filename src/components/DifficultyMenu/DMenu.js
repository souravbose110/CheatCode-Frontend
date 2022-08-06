import React, { useState } from 'react'
import { Button, Menu, MenuButton, MenuItem, MenuList, Progress, Select } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';

function DMenu({ handleDifficulty }) {

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Difficulty
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => handleDifficulty("all")} minH='48px' color={'green'}>
                    All
                </MenuItem>
                <MenuItem onClick={() => handleDifficulty("easy")} minH='48px' color={'green'}>
                    Easy
                </MenuItem>
                <MenuItem onClick={() => handleDifficulty("medium")} minH='40px' color={'orange'}>
                    Medium
                </MenuItem>
                <MenuItem onClick={() => handleDifficulty("hard")} minH='40px' color={'red'}>
                    Hard
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default DMenu