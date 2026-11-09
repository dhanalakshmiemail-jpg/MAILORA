import { Box, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
export default function PageHeader({ eyebrow, title, subtitle, action, onAction }: { eyebrow?:string; title:string; subtitle?:string; action?:string; onAction?:()=>void }) {
 return <Box sx={{display:"flex",justifyContent:"space-between",alignItems:{xs:"flex-start",sm:"center"},gap:2,mb:3,flexWrap:"wrap"}}><Box>{eyebrow&&<Typography variant="overline" color="secondary.main" fontWeight={800} letterSpacing={1.6}>{eyebrow}</Typography>}<Typography variant="h4">{title}</Typography>{subtitle&&<Typography color="text.secondary" sx={{mt:.6}}>{subtitle}</Typography>}</Box>{action&&<Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={onAction}>{action}</Button>}</Box>;
}
