import { useState, useEffect } from 'react';
import { 
  View, 
  Heading, 
  Content, 
  Flex, 
  Text, 
  Switch, 
  ProgressCircle,
  Badge,
  Divider
} from '@adobe/react-spectrum';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';
import Clock from '@spectrum-icons/workflow/Clock';
import TaskList from '@spectrum-icons/workflow/TaskList';

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
            Your Tasks
          </Heading>
        </Flex>
        <Flex alignItems="center" gap="size-200" justifyContent="center" marginTop="size-600">
          <ProgressCircle size="M" isIndeterminate />
          <Text UNSAFE_style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Loading your tasks...
          </Text>
        </Flex>
      </View>
    );
  }

  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');
  const pendingTasks = tasks.filter(task => task.status === 'PENDING');

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
          Your Tasks
        </Heading>
        {tasks.length > 0 && (
          <Badge 
            variant="info" 
            UNSAFE_style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              borderRadius: '12px',
              padding: '4px 12px',
              fontSize: '0.8rem',
              fontWeight: '600'
            }}
          >
            {completedTasks.length}/{tasks.length} completed
          </Badge>
        )}
      </Flex>

      <Content>
        {tasks.length === 0 ? (
          <View 
            UNSAFE_style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '12px',
              border: '2px dashed #cbd5e1'
            }}
          >
            <TaskList size="XL" UNSAFE_style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
            <Text UNSAFE_style={{ 
              color: '#64748b', 
              fontSize: '1.2rem', 
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              No tasks yet!
            </Text>
            <Text UNSAFE_style={{ color: '#94a3b8', fontSize: '1rem' }}>
              Create your first task using the form on the left
            </Text>
          </View>
        ) : (
          <Flex direction="column" gap="size-300">
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <View>
                <Flex alignItems="center" gap="size-100" marginBottom="size-200">
                  <Clock size="M" UNSAFE_style={{ color: '#f59e0b' }} />
                  <Text UNSAFE_style={{ 
                    color: '#374151', 
                    fontSize: '1.1rem', 
                    fontWeight: '600' 
                  }}>
                    Pending ({pendingTasks.length})
                  </Text>
                </Flex>
                <Flex direction="column" gap="size-200">
                  {pendingTasks.map((task) => (
                    <View 
                      key={task.id}
                      UNSAFE_style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Flex direction="column" gap="size-150">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text UNSAFE_style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>
                            {task.title}
                          </Text>
                          <Switch
                            isSelected={task.status === 'COMPLETED'}
                            onChange={(isSelected) => 
                              updateTaskStatus(task.id, isSelected ? 'COMPLETED' : 'PENDING')
                            }
                            UNSAFE_style={{
                              transform: 'scale(1.3)',
                              marginLeft: '1rem'
                            }}
                          >
                            {task.status === 'COMPLETED' ? 'Completed' : 'Mark as done'}
                          </Switch>
                        </Flex>
                        {task.description && (
                          <Text UNSAFE_style={{ 
                            color: '#6b7280',
                            fontSize: '0.95rem',
                            lineHeight: '1.5'
                          }}>
                            {task.description}
                          </Text>
                        )}
                        <Text UNSAFE_style={{ 
                          color: '#9ca3af', 
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          Created: {formatDate(task.createdAt)}
                          {task.updatedAt && ` • Updated: ${formatDate(task.updatedAt)}`}
                        </Text>
                      </Flex>
                    </View>
                  ))}
                </Flex>
              </View>
            )}

            {/* Divider */}
            {pendingTasks.length > 0 && completedTasks.length > 0 && (
              <Divider size="M" UNSAFE_style={{ margin: '1rem 0' }} />
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <View>
                <Flex alignItems="center" gap="size-100" marginBottom="size-200">
                  <CheckmarkCircle size="M" UNSAFE_style={{ color: '#10b981' }} />
                  <Text UNSAFE_style={{ 
                    color: '#374151', 
                    fontSize: '1.1rem', 
                    fontWeight: '600' 
                  }}>
                    Completed ({completedTasks.length})
                  </Text>
                </Flex>
                <Flex direction="column" gap="size-200">
                  {completedTasks.map((task) => (
                    <View 
                      key={task.id}
                      UNSAFE_style={{
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        border: '1px solid #d1fae5',
                        boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)',
                        opacity: 0.8
                      }}
                    >
                      <Flex direction="column" gap="size-150">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text UNSAFE_style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: '600',
                            color: '#065f46',
                            textDecoration: 'line-through'
                          }}>
                            {task.title}
                          </Text>
                          <Switch
                            isSelected={task.status === 'COMPLETED'}
                            onChange={(isSelected) => 
                              updateTaskStatus(task.id, isSelected ? 'COMPLETED' : 'PENDING')
                            }
                            UNSAFE_style={{
                              transform: 'scale(1.3)',
                              marginLeft: '1rem'
                            }}
                          >
                            {task.status === 'COMPLETED' ? 'Completed' : 'Mark as done'}
                          </Switch>
                        </Flex>
                        {task.description && (
                          <Text UNSAFE_style={{ 
                            color: '#047857',
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            textDecoration: 'line-through',
                            opacity: 0.7
                          }}>
                            {task.description}
                          </Text>
                        )}
                        <Text UNSAFE_style={{ 
                          color: '#059669', 
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}>
                          Created: {formatDate(task.createdAt)}
                          {task.updatedAt && ` • Completed: ${formatDate(task.updatedAt)}`}
                        </Text>
                      </Flex>
                    </View>
                  ))}
                </Flex>
              </View>
            )}
          </Flex>
        )}
      </Content>
    </View>
  );
}
