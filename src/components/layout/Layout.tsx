import { ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box className={styles.layout}>
      <Header />
      <Box component="main" className={styles.main}>
        {children}
      </Box>
    </Box>
  );
}
