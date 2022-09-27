import {
  StackDivider,
  VStack,
  HStack,
  Text,
  Box,
  Image,
} from '@chakra-ui/react';
import ClearTasks from './ClearTasks';
import DeleteTask from './DeleteTask';
import img from '../images/empty.svg';
import supabase from '../supabase';
import { useEffect, useState } from 'react';

export default function TaskList() {
  const [todos, setTodos] = useState([]);

  async function fetchData() {
    let { data: todos, error } = await supabase.from('todos').select('*');
    console.log(todos);
    setTodos(todos);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!todos.length) {
    return (
      <Box align="center">
        <Image src={img} mt="30px" maxW="95%" />
      </Box>
    );
  }
  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        alignItems="stretch"
      >
        {todos.map(todo => (
          <HStack key={todo.id}>
            <Text w="100%" p="8px" borderRadius="lg">
              {todo.text}
            </Text>
            <DeleteTask id={todo.id} />
          </HStack>
        ))}
      </VStack>
      <ClearTasks />
    </>
  );
}
