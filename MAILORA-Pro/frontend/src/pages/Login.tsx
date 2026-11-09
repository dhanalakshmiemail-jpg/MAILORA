import { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../app/api";
import { useAppDispatch } from "../app/hooks";
import { signedIn } from "../features/auth/authSlice";
import Brand from "../components/Brand";
export default function Login() {
 const [email,setEmail]=useState("admin@mailora.local"),[password,setPassword]=useState("ChangeThisPassword123!"),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 const dispatch=useAppDispatch(),navigate=useNavigate();
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");try{const data=await api<{token:string;user:{id:string;name:string;email:string;role:string}}>("/auth/login",{method:"POST",body:JSON.stringify({email,password})});dispatch(signedIn(data));navigate("/");}catch(err){setError(err instanceof Error?err.message:"Unable to sign in");}finally{setBusy(false);}}
 return <Box sx={{minHeight:"100vh",display:"grid",gridTemplateColumns:{md:"1.05fr .95fr"},background:"radial-gradient(circle at 18% 18%,#39246c 0,transparent 34%),#090b13"}}>
  <Box sx={{p:{xs:3,md:7},display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:{md:"100vh"}}}><Brand/><Box sx={{maxWidth:620,py:8}}><Typography variant="overline" color="secondary.main" letterSpacing={3}>THE NEXT CHAPTER OF EMAIL</Typography><Typography sx={{fontSize:{xs:42,md:64},fontWeight:900,lineHeight:1.02,letterSpacing:"-.06em",mt:2}}>Campaigns that <Box component="span" sx={{background:"linear-gradient(90deg,#B69AFF,#42D9E8)",backgroundClip:"text",color:"transparent"}}>mean more.</Box></Typography><Typography color="rgba(255,255,255,.62)" sx={{fontSize:17,lineHeight:1.8,mt:3,maxWidth:480}}>A command centre for thoughtful communication. Plan, deliver and understand every campaign from one intelligent workspace.</Typography></Box><Typography variant="caption" color="rgba(255,255,255,.4)">© 2026 MAILORA · INTELLIGENT EMAIL CAMPAIGN PLATFORM</Typography></Box>
  <Box sx={{display:"grid",placeItems:"center",p:3}}><Card sx={{width:"100%",maxWidth:440,background:"rgba(17,21,34,.92)",backdropFilter:"blur(20px)"}}><CardContent sx={{p:{xs:3,md:4}}}><Typography variant="overline" color="secondary.main" letterSpacing={2}>WELCOME BACK</Typography><Typography variant="h5" sx={{mt:1}}>Sign in to your workspace</Typography><Typography color="text.secondary" sx={{mt:1,mb:3}}>Your campaigns are waiting.</Typography><form onSubmit={submit}><Stack spacing={2}><TextField label="Work email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required fullWidth/><TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required fullWidth/>{error&&<Alert severity="error">{error}</Alert>}<Button type="submit" variant="contained" size="large" disabled={busy}>{busy?"Signing in…":"Enter workspace"}</Button></Stack></form><Typography variant="caption" color="text.secondary" sx={{display:"block",mt:3}}>Use the admin credentials configured in backend/.env.</Typography></CardContent></Card></Box>
 </Box>;
}
