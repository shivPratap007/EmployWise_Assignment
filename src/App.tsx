import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import UserList from "./UserList";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
