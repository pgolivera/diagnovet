import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { SEO } from "@components/shared/seo";
import styles from "./Dashboard.module.css";

interface StatCard {
  title: string;
  value: number;
  description: string;
}

const stats: StatCard[] = [
  { title: "Total Reports", value: 24, description: "All time reports" },
  { title: "Total Patients", value: 18, description: "Registered patients" },
  { title: "Active Reports", value: 3, description: "In progress" },
];

export default function Dashboard() {
  return (
    <>
      <SEO title="Dashboard" description="DiagnoVet Dashboard - Manage your veterinary reports" />
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} component={Link} to="/viewer">
            New Report
          </Button>
        </Box>

        <Box className={styles.stats}>
          {stats.map((stat) => (
            <Card key={stat.title} className={styles.statCard}>
              <CardContent>
                <Typography variant="h3" component="div" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="h6" component="div">
                  {stat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Card className={styles.recentReports}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Recent Reports
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No reports yet. Create your first report to get started.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
