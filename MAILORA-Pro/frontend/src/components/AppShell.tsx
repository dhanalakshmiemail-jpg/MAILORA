import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Box, Button, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import Brand from "./Brand";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signedOut } from "../features/auth/authSlice";
import { toggleMode } from "../features/ui/uiSlice";
const nav = [
  { label:"Overview", path:"/", icon:<DashboardRoundedIcon/> },
  { label:"Campaigns", path:"/campaigns", icon:<CampaignRoundedIcon/> },
  { label:"Contacts", path:"/contacts", icon:<ContactsRoundedIcon/> },
  { label:"Analytics", path:"/analytics", icon:<InsightsRoundedIcon/> },
  { label:"Templates", path:"/templates", icon:<AutoAwesomeRoundedIcon/> },
  { label:"Settings", path:"/settings", icon:<SettingsRoundedIcon/> }
];
const width = 252;
export default function AppShell() {
  const [open,setOpen] = useState(false); const mobile = useMediaQuery("(max-width:900px)");
  const dispatch = useAppDispatch(), navigate = useNavigate(), location = useLocation();
  const user = useAppSelector(s=>s.auth.user);
  const drawer = <Box sx={{height:"100%",display:"flex",flexDirection:"column",p:2}}>
    <Box sx={{px:1.2,py:2,mb:2}}><Brand/></Box>
    <Typography variant="overline" color="text.secondary" sx={{px:1.5,mb:1,letterSpacing:1.8}}>WORKSPACE</Typography>
    <List sx={{p:0,flex:1}}>{nav.map(item=><ListItemButton key={item.path} component={NavLink} to={item.path} onClick={()=>setOpen(false)} selected={location.pathname===item.path} sx={{borderRadius:2.5,mb:.6,py:1.25,"&.active":{background:"rgba(139,92,246,.14)",color:"#B99AFF"},"&.Mui-selected":{background:"rgba(139,92,246,.14)",color:"#B99AFF"},"&.Mui-selected:hover":{background:"rgba(139,92,246,.2)"}}}><ListItemIcon sx={{minWidth:38,color:"inherit"}}>{item.icon}</ListItemIcon><ListItemText primary={item.label} primaryTypographyProps={{fontSize:14,fontWeight:650}}/></ListItemButton>)}</List>
    <Box sx={{p:1.5,borderRadius:3,bgcolor:"rgba(139,92,246,.10)",border:"1px solid rgba(139,92,246,.18)"}}><Typography variant="caption" color="secondary.main" fontWeight={800}>MAILORA INSIGHT</Typography><Typography variant="body2" sx={{mt:.5}}>Build stronger connections with smarter campaigns.</Typography></Box>
    <Divider sx={{my:2}}/><Button startIcon={<LogoutRoundedIcon/>} color="inherit" onClick={()=>{dispatch(signedOut());navigate("/login");}}>Sign out</Button>
  </Box>;
  return <Box sx={{display:"flex",minHeight:"100vh"}}>
    {mobile ? <Drawer open={open} onClose={()=>setOpen(false)} PaperProps={{sx:{width,background:"background.paper"}}}>{drawer}</Drawer> : <Drawer variant="permanent" PaperProps={{sx:{width,border:0,borderRight:"1px solid rgba(148,163,184,.12)",background:"background.paper",boxSizing:"border-box"}}} sx={{width,flexShrink:0,"& .MuiDrawer-paper":{width,position:"fixed"}}}>{drawer}</Drawer>}
    <Box component="main" sx={{flex:1,minWidth:0,ml:mobile?0:`${width}px`}}>
      <AppBar position="sticky" elevation={0} color="transparent" sx={{backdropFilter:"blur(18px)",borderBottom:"1px solid",borderColor:"divider"}}><Toolbar sx={{minHeight:"72px!important",px:{xs:2,md:4}}}>
        {mobile&&<IconButton onClick={()=>setOpen(true)} sx={{mr:1}}><MenuRoundedIcon/></IconButton>}
        <Box sx={{flex:1}}><Typography variant="caption" color="text.secondary">WORKSPACE / {location.pathname.split("/")[1]?.toUpperCase() || "OVERVIEW"}</Typography><Typography fontWeight={750}>Good evening, {user?.name?.split(" ")[0] || "there"}</Typography></Box>
        <IconButton onClick={()=>dispatch(toggleMode())} sx={{mr:1}}>{useAppSelector(s=>s.ui.mode)==="dark"?<LightModeRoundedIcon/>:<DarkModeRoundedIcon/>}</IconButton>
        <Avatar sx={{width:36,height:36,bgcolor:"primary.main",fontWeight:800}}>{user?.name?.[0]||"M"}</Avatar>
      </Toolbar></AppBar>
      <Box sx={{p:{xs:2,md:4},maxWidth:1600,mx:"auto"}}><Outlet/></Box>
    </Box>
  </Box>;
}
