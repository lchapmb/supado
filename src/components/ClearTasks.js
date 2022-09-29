import { Flex, Button } from '@chakra-ui/react';
import supabase from '../supabase';
import { useState } from 'react';

export default function ClearTasks() {
  const [loading, setLoading] = useState(false);

  async function handleClear() {
    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .not('text', 'eq', 'Do not delete');
    setLoading(false);
  }

  return (
    <Flex>
      <Button
        colorScheme="gray"
        px="8"
        h="45"
        color="gray.500"
        mt="10"
        onClick={handleClear}
        isLoading={loading}
        loadingText="Clearing"
      >
        Clear Tasks
      </Button>
    </Flex>
  );
}
