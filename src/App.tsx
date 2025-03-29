import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import UserList from "./UserList";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";


function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
