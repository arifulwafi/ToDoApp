import { 
  Provider, 
  defaultTheme, 
  View, 
  Heading, 
  Content, 
  Grid,
  Flex,
  Divider,
  Text
} from '@adobe/react-spectrum';
import TodoListSimple from './components/TodoListSimple';
import AddTaskFormSimple from './components/AddTaskFormSimple';

function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <View 
        minHeight="100vh"
        UNSAFE_style={{
          padding: 0
        }}
      >
        <View 
          padding="size-600"
          maxWidth="1200px"
          marginX="auto"
        >
          {/* Header Section */}
          <Flex 
            direction="column" 
            alignItems="center" 
            marginBottom="size-600"
            UNSAFE_style={{
              textAlign: 'center'
            }}
          >
            <View
              UNSAFE_style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}
            >
              <Heading 
                level={1} 
                marginBottom="size-200"
                UNSAFE_style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  margin: 0
                }}
              >
                Todo Master
              </Heading>
              <Text
                UNSAFE_style={{
                  color: '#6b7280',
                  fontSize: '1.1rem',
                  fontWeight: '500'
                }}
              >
                Organize your life, one task at a time
              </Text>
            </View>
          </Flex>

          {/* Main Content Grid */}
          <Grid 
            areas={['form', 'list']}
            columns={['1fr']}
            rows={['auto', '1fr']}
            gap="size-400"
            UNSAFE_style={{
              '@media (min-width: 768px)': {
                gridTemplateAreas: '"form list"',
                gridTemplateColumns: '400px 1fr',
                gap: '2rem'
              }
            }}
          >
            <View 
              gridArea="form"
              UNSAFE_style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                height: 'fit-content'
              }}
            >
              <AddTaskFormSimple />
            </View>

            <View 
              gridArea="list"
              UNSAFE_style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e2e8f0',
                minHeight: '400px'
              }}
            >
              <TodoListSimple />
            </View>
          </Grid>
        </View>
      </View>
    </Provider>
  );
}

export default App;