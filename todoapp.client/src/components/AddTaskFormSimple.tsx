import { useState } from 'react';
import { 
  View, 
  Heading, 
  Form, 
  TextField, 
  TextArea, 
  Button, 
  Flex,
  Well 
} from '@adobe/react-spectrum';

export default function AddTaskFormSimple() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateTask($input: CreateTaskInput!) {
              createTask(input: $input) {
                id
                title
                description
                status
                createdAt
                updatedAt
              }
            }
          `,
          variables: {
            input: {
              title: title.trim(),
              description: description.trim(),
            },
          },
        }),
      });

      const result = await response.json();
      if (result.data) {
        setTitle('');
        setDescription('');
        // Refresh the page to show the new task
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View marginBottom="size-400">
      <Heading level={2} marginBottom="size-300">
        Add New Task
      </Heading>
      <Well>
        <Form>
          <Flex direction="column" gap="size-200">
            <TextField
              label="Title"
              value={title}
              onChange={setTitle}
              placeholder="Enter task title..."
              isRequired
            />
            <TextArea
              label="Description"
              value={description}
              onChange={setDescription}
              placeholder="Enter task description (optional)..."
            />
            <Button
              variant="cta"
              onPress={handleSubmit}
              isDisabled={!title.trim() || isCreating}
            >
              {isCreating ? 'Adding...' : 'Add Task'}
            </Button>
          </Flex>
        </Form>
      </Well>
    </View>
  );
}
