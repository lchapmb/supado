import { IconButton, useToast } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import supabase from '../supabase';
import { useState } from 'react';

export default function DeleteTask(props) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleDelete() {
    setLoading(true);
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', props.id);
    setLoading(false);

    toast({
      title: error || 'Todo deleted!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <IconButton
      isRound="true"
      icon={<FiTrash2 />}
      onClick={handleDelete}
      isLoading={loading}
    />
  );
}
