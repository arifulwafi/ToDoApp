import { useState, useEffect } from 'react';
import { View, Heading, Content, Flex, Text, Switch, Well } from '@adobe/react-spectrum';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt?: string;
}

export default function TodoListSimple() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              allTasks {
                id
                title
                description
                status
                createdAt
                updatedAt
              }
            }
          `,
        }),
      });

      const result = await response.json();
      if (result.data) {
        setTasks(result.data.allTasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: 'PENDING' | 'COMPLETED') => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation UpdateTaskStatus($input: UpdateTaskStatusInput!) {
              updateTaskStatus(input: $input) {
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
              id: taskId,
              status: newStatus,
            },
          },
        }),
      });

      const result = await response.json();
      if (result.data) {
        // Refresh the tasks list
        fetchTasks();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <View>
        <Heading level={2} marginBottom="size-300">
          Tasks
        </Heading>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View>
      <Heading level={2} marginBottom="size-300">
        Tasks
      </Heading>
      <Content>
        {tasks.length === 0 ? (
          <Text>No tasks yet. Add one above!</Text>
        ) : (
          <Flex direction="column" gap="size-200">
            {tasks.map((task) => (
              <Well key={task.id}>
                <Flex direction="column" gap="size-100">
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text UNSAFE_style={{ textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none' }}>
                      {task.title}
                    </Text>
                    <Switch
                      isSelected={task.status === 'COMPLETED'}
                      onChange={(isSelected) => 
                        updateTaskStatus(task.id, isSelected ? 'COMPLETED' : 'PENDING')
                      }
                    >
                      {task.status === 'COMPLETED' ? '✓' : '✗'}
                    </Switch>
                  </Flex>
                  {task.description && (
                    <Text UNSAFE_style={{ 
                      textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
                      opacity: task.status === 'COMPLETED' ? 0.6 : 1 
                    }}>
                      {task.description}
                    </Text>
                  )}
                  <Text UNSAFE_style={{ opacity: 0.7, fontSize: '12px' }}>
                    Created: {formatDate(task.createdAt)}
                    {task.updatedAt && ` • Updated: ${formatDate(task.updatedAt)}`}
                  </Text>
                </Flex>
              </Well>
            ))}
          </Flex>
        )}
      </Content>
    </View>
  );
}
