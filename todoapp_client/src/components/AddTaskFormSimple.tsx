import { useState } from 'react';
import { 
  View, 
  Heading, 
  Form, 
  TextField, 
  TextArea, 
  Button, 
  Flex,
  Text,
  ProgressCircle
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import TaskList from '@spectrum-icons/workflow/TaskList';

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
    <View>
      <Flex alignItems="center" gap="size-150" marginBottom="size-400">
        <TaskList size="L" UNSAFE_style={{ color: '#667eea' }} />
        <Heading 
          level={2} 
          margin={0}
          UNSAFE_style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}
        >
          Create New Task
        </Heading>
      </Flex>
      
      <Form>
        <Flex direction="column" gap="size-400">
          {/* Task Title Field */}
          <View>
            <Text 
              UNSAFE_style={{
                display: 'block',
                fontFamily: 'adobe-clean, "adobe clean", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Trebuchet MS", "Lucida Grande", sans-serif',
                fontSize: '14px',
                lineHeight: '1.3',
                fontWeight: '700',
                marginBottom: '8px',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: '#374151'
              }}
            >
              Task Title *
            </Text>
            <TextField
              value={title}
              onChange={setTitle}
              placeholder="What needs to be done?"
              isRequired
              UNSAFE_style={{
                width: '100%'
              }}
            />
          </View>
          
          {/* Description Field */}
          <View>
            <Text 
              UNSAFE_style={{
                display: 'block',
                fontFamily: 'adobe-clean, "adobe clean", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Trebuchet MS", "Lucida Grande", sans-serif',
                fontSize: '14px',
                lineHeight: '1.3',
                fontWeight: '700',
                marginBottom: '8px',
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: '#374151'
              }}
            >
              Description
            </Text>
            <TextArea
              value={description}
              onChange={setDescription}
              placeholder="Describe the details you'd like to include for your task..."
              height="size-1200"
              UNSAFE_style={{
                width: '100%'
              }}
            />
            <Text 
              UNSAFE_style={{
                display: 'block',
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '6px',
                fontStyle: 'italic'
              }}
            >
              Add more context to help you remember what this task involves.
            </Text>
          </View>
          
          {/* Submit Button */}
          <Button
            variant="primary"
            onPress={handleSubmit}
            isDisabled={!title.trim() || isCreating}
            UNSAFE_style={{
              marginTop: '1rem'
            }}
          >
            <Flex alignItems="center" gap="size-100">
              {isCreating ? (
                <>
                  <ProgressCircle 
                    size="S" 
                    isIndeterminate 
                  />
                  <Text>Creating...</Text>
                </>
              ) : (
                <>
                  <Add size="S" />
                  <Text>Add Task</Text>
                </>
              )}
            </Flex>
          </Button>
        </Flex>
      </Form>
    </View>
  );
}
