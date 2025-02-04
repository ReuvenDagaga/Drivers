import { Layout } from "./Layout/Layout";
import { AppRoutes } from "./Routes/AppRoutes";

function App() {
  return <Layout children={<AppRoutes />} />;
}

export default App;
