import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
export default function ProtectedRoute() { const ok = useAppSelector(s => s.auth.authenticated); return ok ? <Outlet/> : <Navigate to="/login" replace/>; }
