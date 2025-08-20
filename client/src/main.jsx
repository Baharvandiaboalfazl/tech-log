import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import moment from "moment-jalaali";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

moment.loadPersian({ usePersianDigits: true });

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
