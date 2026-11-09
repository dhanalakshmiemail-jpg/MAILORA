import { Routes,Route } from "react-router-dom";
import { useMemo } from "react";
import { ThemeProvider } from "@mui/material";
import { useAppSelector } from "./app/hooks";
import { createMailoraTheme } from "./theme/theme";
import ProtectedRoute from "./components/ProtectedRoute";import AppShell from "./components/AppShell";
import Login from "./pages/Login";import Dashboard from "./pages/Dashboard";import Campaigns from "./pages/Campaigns";import CampaignStudio from "./pages/CampaignStudio";import Contacts from "./pages/Contacts";import Analytics from "./pages/Analytics";import Templates from "./pages/Templates";import Settings from "./pages/Settings";import CampaignDetail from "./pages/CampaignDetail";
export default function App(){const mode=useAppSelector(s=>s.ui.mode);const theme=useMemo(()=>createMailoraTheme(mode),[mode]);return <ThemeProvider theme={theme}><Routes><Route path="/login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route element={<AppShell/>}><Route index element={<Dashboard/>}/><Route path="/campaigns" element={<Campaigns/>}/><Route path="/campaigns/new" element={<CampaignStudio/>}/><Route path="/campaigns/:id" element={<CampaignDetail/>}/><Route path="/contacts" element={<Contacts/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/templates" element={<Templates/>}/><Route path="/settings" element={<Settings/>}/></Route></Route></Routes></ThemeProvider>;}
