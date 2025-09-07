import { Provider, defaultTheme, View, Heading, Content } from '@adobe/react-spectrum';
import TodoListSimple from './components/TodoListSimple';
import AddTaskFormSimple from './components/AddTaskFormSimple';

function App() {
  return (
    <Provider theme={defaultTheme} colorScheme="light">
      <View padding="size-400">
        <Heading level={1} marginBottom="size-400">
          Todo App
        </Heading>
        <Content>
          <AddTaskFormSimple />
          <TodoListSimple />
        </Content>
      </View>
    </Provider>
  );
}

export default App;