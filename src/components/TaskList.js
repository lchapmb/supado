import {
  StackDivider,
  VStack,
  HStack,
  Text,
  Box,
  Image,
  Skeleton,
} from '@chakra-ui/react';
import ClearTasks from './ClearTasks';
import DeleteTask from './DeleteTask';
import img from '../images/empty.svg';
import { useRealtime } from 'react-supabase';

export default function TaskList() {
  const [results, reexecute] = useRealtime('todos');
  const { data: todos, error, fetching } = results;

  if (fetching) {
    return (
      <Skeleton
        width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        height="300px"
        rounded="md"
      />
    );
  }

  if (!todos || !todos.length) {
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
