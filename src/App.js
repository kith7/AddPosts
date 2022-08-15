import PostsList from "./features/PostsList";
import { AddPostForm } from "./features/AddPostForm";
function App() {
  return (
    <main className='App'>
      <AddPostForm />
      <PostsList />
    </main>
  );
}

export default App;
